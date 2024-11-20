"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useClerk } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import * as NProgress from "nprogress"

export default function SignOutButton() {
    const { signOut } = useClerk()

    const handleSignOut = () => {
        NProgress.start()
        signOut({ redirectUrl: "/" }).then(() => {
            NProgress.done()
        })
    }

    return (
        <DropdownMenuItem>
            <button
                className="w-full flex items-center gap-2"
                onClick={handleSignOut}
            >
                <LogOut className="size-4" />
                Log out
            </button>
        </DropdownMenuItem>
    )
}
