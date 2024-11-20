"use client"

import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/global/loader"
import { MicrosoftAuthButton } from "@/components/global/microsoft-oauth-button"
import { Button } from "@/components/ui/button"
import { CONSTANTS } from "@/constants"
import { useAuthSignIn } from "@/hooks/authentication"

export default function SignInForm() {
    const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn()

    return (
        <>
            <form
                className="flex flex-col gap-5 mt-10"
                onSubmit={onAuthenticateUser}
            >
                {CONSTANTS.signInForm.map((field) => (
                    <FormGenerator
                        {...field}
                        key={field.id}
                        register={register}
                        errors={errors}
                    />
                ))}
                <div className="mt-8">
                    <Button type="submit" className="rounded-2xl w-full">
                        <Loader loading={isPending}>Sign In with Email</Loader>
                    </Button>
                </div>
            </form>
            <div className="mt-4">
                <MicrosoftAuthButton method="signin" />
            </div>
        </>
    )
}
