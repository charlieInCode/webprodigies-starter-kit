import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const CompleteSigIn = async () => {
    const user = await currentUser()

    if (!user) {
        return redirect(`/sign-in`)
    }

    const mainEmail = user.primaryEmailAddress?.emailAddress ?? ""

    const emailWhiteList = process.env.EMAIL_WHITE_LIST

    if (!emailWhiteList) {
        throw new Error("EMAIL_WHITE_LIST is not defined")
    }

    const EMAIL_WHITE_LIST = emailWhiteList
        .split(",")
        .map((email) => email.trim())

    let allowed = false
    EMAIL_WHITE_LIST.forEach((email) => {
        if (mainEmail.endsWith(email)) {
            allowed = true
        }
    })

    if (!allowed) {
        return redirect(`/not-allowed`)
    }

    redirect(`/dashboard`)
}

export default CompleteSigIn
