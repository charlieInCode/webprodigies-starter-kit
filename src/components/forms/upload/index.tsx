"use client"

import FileUploader from "@/components/global/file-uploader"
import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CONSTANTS } from "@/constants"
import { useUploadDocs } from "@/hooks/forms"

export default function UploadForm() {
    const { isPending, onUploadFiles, form } = useUploadDocs()

    return (
        <div>
            <Form {...form}>
                <form
                    className="flex flex-col gap-5 mt-10 max-w-screen-lg mx-auto w-full border rounded p-4 lg:p-12 shadow-md"
                    onSubmit={onUploadFiles}
                >
                    <h1 className="text-2xl font-bold">Form</h1>
                    {CONSTANTS.docs.map((doc) => (
                        <FileUploader
                            control={form.control}
                            key={doc.id}
                            name={doc.name}
                            label={doc.title}
                            dropZoneConfig={{
                                accept:
                                    doc.fileType === "csv"
                                        ? {
                                              "text/csv": [".csv"],
                                          }
                                        : doc.fileType === "xlsx"
                                          ? {
                                                "application/vnd.ms-excel": [
                                                    ".xls",
                                                    ".xlsx",
                                                    ".xlsb",
                                                    ".xlsm",
                                                    ".xltx",
                                                    ".xltm",
                                                    ".xls",
                                                    ".xlt",
                                                    ".xla",
                                                    ".xlam",
                                                ],
                                            }
                                          : undefined,
                                maxFiles: 1,
                                maxSize: doc.maxFileSize,
                                multiple: false,
                            }}
                            acceptedFileTypes={[doc.fileType]}
                        />
                    ))}
                    <div className="mt-8">
                        <Button type="submit" className="rounded-2xl w-full">
                            <Loader loading={isPending}>Submit</Loader>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
