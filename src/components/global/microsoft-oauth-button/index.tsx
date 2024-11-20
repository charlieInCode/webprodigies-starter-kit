"use client"

import { Button } from "@/components/ui/button"
import { useOauth } from "@/hooks/authentication"
import { Loader } from "../loader"

type MicrosoftAuthButtonProps = {
    method: "signup" | "signin"
}

export const MicrosoftAuthButton = ({ method }: MicrosoftAuthButtonProps) => {
    const { signUpWith, signInWith } = useOauth()
    return (
        <Button
            {...(method === "signin"
                ? {
                      onClick: () => signInWith("oauth_microsoft"),
                  }
                : {
                      onClick: () => signUpWith("oauth_microsoft"),
                  })}
            className="w-full rounded-2xl flex gap-2"
            variant="outline"
        >
            <Loader loading={false}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="size-5"
                >
                    <path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z" />
                </svg>
                Microsoft
            </Loader>
        </Button>
    )
}
