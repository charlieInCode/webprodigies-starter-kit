import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export default async function Home() {
    const user = await onAuthenticatedUser()

    if (user.status === 200) {
        redirect("/callback/sign-in")
    }

    redirect("/sign-in")
}
