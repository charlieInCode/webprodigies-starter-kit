import { onAuthenticatedUser } from "@/actions/auth"
import { Card } from "@/components/ui/card"
import { CONSTANTS } from "@/constants"
import { redirect } from "next/navigation"
import React from "react"

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const applicationName = CONSTANTS.general.APPLICATION_NAME

    const user = await onAuthenticatedUser()

    if (user.status === 200) {
        redirect("/callback/sign-in")
    }

    return (
        <div className="container h-screen flex justify-center items-center">
            <div className="flex flex-col w-full items-center py-24">
                <Card className="w-full max-w-sm mx-auto p-6">
                    <h2 className="text-4xl font-bold text-center">
                        {applicationName}
                    </h2>
                    <div className="mt-8">{children}</div>
                </Card>
            </div>
        </div>
    )
}
