import { onAuthenticatedUser } from "@/actions/auth"
import { CONSTANTS } from "@/constants"
import { redirect } from "next/navigation"
import SignOutButton from "./_components/sign-out-button"

export default async function NotAllowedPage() {
    const user = await onAuthenticatedUser()

    if (!user.id) {
        redirect("/")
    }

    const applicationName = CONSTANTS.general.APPLICATION_NAME

    return (
        <div className="container h-screen flex justify-center items-center">
            <div className="flex flex-col w-full items-center py-24">
                <h2 className="text-4xl font-bold text-center">
                    {applicationName}
                </h2>
                <p className="mt-8 text-center">
                    You are not allowed to access this app.
                </p>
                <div className="max-w-36 mx-auto mt-6">
                    <SignOutButton />
                </div>
            </div>
        </div>
    )
}
