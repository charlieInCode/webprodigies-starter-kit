import { onUploadFiles as onUploadFilesAction } from "@/actions/upload"
import { clearResults, setResults } from "@/redux/slices/result-slices"
import { AppDispatch } from "@/redux/store"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export const useUploadDocs = () => {
    const router = useRouter()
    const dispatch: AppDispatch = useDispatch()

    const form = useForm<any>({
        mode: "onBlur",
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ["update-documents"],
        mutationFn: async (values: { [fileName: string]: [File] }) => {
            return onUploadFilesAction(values)
        },
        onMutate: () => {
            dispatch(clearResults())
        },
        onError: (error) => {
            toast("Error", {
                description: error.message,
            })
        },
        onSuccess: ({ data, missingMappingData }) => {
            toast("Success", {
                description: "Files uploaded successfully",
            })

            dispatch(
                setResults({
                    results: data,
                    missingMappingData,
                }),
            )

            router.push("/dashboard/results")
        },
    })

    const onUploadFiles = form.handleSubmit(async (values) => mutate(values))

    return {
        form,
        register: form.register,
        errors: form.formState.errors,
        onUploadFiles,
        isPending,
    }
}
