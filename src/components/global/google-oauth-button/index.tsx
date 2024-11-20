"use client"

import { Button } from "@/components/ui/button"
import { useOauth } from "@/hooks/authentication"
import { Loader } from "../loader"

type GoogleAuthButtonProps = {
    method: "signup" | "signin"
}

export const GoogleAuthButton = ({ method }: GoogleAuthButtonProps) => {
    const { signUpWith, signInWith } = useOauth()
    return (
        <Button
            {...(method === "signin"
                ? {
                      onClick: () => signInWith("oauth_google"),
                  }
                : {
                      onClick: () => signUpWith("oauth_google"),
                  })}
            className="w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray"
            variant="outline"
        >
            <Loader loading={false}>
                <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_7948_15260)">
                        <path
                            d="M8.98667 0.5C11.0454 0.5 12.5663 1.22583 13.74 2.23759L12.9023 3.07522C11.93 2.28093 10.6507 1.69533 8.98667 1.69533C5.48352 1.69533 2.75334 4.52362 2.75334 8.00867C2.75334 11.4937 5.48352 14.322 8.98667 14.322C11.2289 14.322 12.5404 13.4107 13.3756 12.5756L13.3778 12.5733C14.0964 11.8454 14.539 10.8355 14.7091 9.53134L14.7828 8.96667H14.2133H9.48667V7.78H15.9185C15.9477 8.04123 15.962 8.33409 15.962 8.64867C15.962 10.2114 15.5264 12.0952 14.2151 13.4064L14.2151 13.4064L14.2085 13.4132C12.9054 14.7664 11.2426 15.5 8.98667 15.5C4.84481 15.5 1.37134 12.1233 1.37134 8C1.37134 3.87672 4.84481 0.5 8.98667 0.5Z"
                            fill="#000"
                            stroke="#000"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_7948_15260">
                            <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(0.666687)"
                            />
                        </clipPath>
                    </defs>
                </svg>
                Google
            </Loader>
        </Button>
    )
}
