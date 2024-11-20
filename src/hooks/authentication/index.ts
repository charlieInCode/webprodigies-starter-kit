import { useSignIn, useSignUp } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "nextjs-toploader/app"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { SignInSchema } from "./schema"

export const useAuthSignIn = () => {
    const { isLoaded, setActive, signIn } = useSignIn()

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        mode: "onBlur",
    })

    const router = useRouter()

    const { mutate: InitiateLoginFlow, isPending } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string
            password: string
        }) => onClerkAuth(email, password),
    })

    const onClerkAuth = async (email: string, password: string) => {
        if (!isLoaded) {
            return toast("Error", {
                description: "Oops! something went wrong",
            })
        }

        try {
            const authenticated = await signIn.create({
                identifier: email,
                password: password,
            })

            if (authenticated.status === "complete") {
                await setActive({ session: authenticated.createdSessionId })
                reset()
                router.push("/callback/sign-in")
            }
        } catch (error: any) {
            if (error.errors[0].code === "form_password_incorrect") {
                return toast("Error", {
                    description: "email/password is incorrect try again",
                })
            }

            toast("Error", {
                description: error?.message || "Oops! something went wrong",
            })
        }
    }

    const onAuthenticateUser = handleSubmit(async (values) => {
        InitiateLoginFlow({ email: values.email, password: values.password })
    })

    return {
        register,
        errors,
        onAuthenticateUser,
        isPending,
    }
}

export const useOauth = () => {
    const { signIn, isLoaded: LoadedSignIn } = useSignIn()
    const { signUp, isLoaded: LoadedSignUp } = useSignUp()

    const signInWith = (strategy: OAuthStrategy) => {
        if (!LoadedSignIn) return
        try {
            return signIn.authenticateWithRedirect({
                strategy,
                redirectUrl: "/callback",
                redirectUrlComplete: "/callback/sign-in",
            })
        } catch (error) {
            console.error(error)
        }
    }

    const signUpWith = (strategy: OAuthStrategy) => {
        if (!LoadedSignUp) return
        try {
            return signUp.authenticateWithRedirect({
                strategy,
                redirectUrl: "/callback",
                redirectUrlComplete: "/callback/sign-in",
            })
        } catch (error) {
            console.error(error)
        }
    }

    return { signUpWith, signInWith }
}
