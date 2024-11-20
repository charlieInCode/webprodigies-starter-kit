"use server"

import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticatedUser = async () => {
    try {
        const user = await currentUser()

        if (user) {
            return {
                status: 200,
                id: user.id,
                username: user.username,
                email: user.emailAddresses?.[0] ?? null,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.fullName,
            }
        }

        return {
            status: 404,
        }
    } catch (error) {
        return {
            status: 400,
        }
    }
}
