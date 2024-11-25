import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ResultProps = {
    results: {
        channel: string
        branch: string
        quantity: number
        sku: string
        createdAt: Date
    }[]
    missingMappingData: Record<string, string[]>
}

type InitialStateProps = {
    data: ResultProps | null
}

const initialState: InitialStateProps = {
    data: null,
}

export const ParseResultSlice = createSlice({
    name: "parseResult",
    initialState,
    reducers: {
        setResults: (state, action: PayloadAction<ResultProps>) => {
            state.data = action.payload
        },
        clearResults: (state) => {
            state.data = null
        },
    },
})

export const { setResults, clearResults } = ParseResultSlice.actions
export default ParseResultSlice.reducer
