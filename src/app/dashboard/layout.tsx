import { onAuthenticatedUser } from "@/actions/auth"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { AppSidebar } from "./_components/app-sidebar"

type Props = {
    children: React.ReactNode
    params: {
        groupid: string
    }
}

const GroupLayout = async ({ children, params }: Props) => {
    const query = new QueryClient()

    const user = await onAuthenticatedUser()

    const email = user.email?.emailAddress ?? ""

    if (user.status !== 200) redirect("/sign-in")

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <SidebarProvider>
                <AppSidebar
                    user={{
                        name: user.fullName ?? "User",
                        email,
                        avatar: "/avatars/shadcn.jpg",
                    }}
                />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </HydrationBoundary>
    )
}

export default GroupLayout
