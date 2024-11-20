"use client"

import {
    MutationCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"
import * as nprogress from "nprogress"

type ReactQueryProviderProps = {
    children: React.ReactNode
}

const client = new QueryClient({
    mutationCache: new MutationCache({
        onMutate: () => {
            nprogress.start()
        },
        onError: () => {
            nprogress.done()
        },
        onSuccess: () => {
            nprogress.done()
        },
    }),
})

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
