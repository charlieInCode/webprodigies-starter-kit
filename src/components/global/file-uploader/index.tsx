"use client"

import {
    FileInput,
    FileUploader as FileUploaderComponent,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/ui/file-upload"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CloudUpload, Paperclip } from "lucide-react"
import { DropzoneOptions } from "react-dropzone"
import { Control } from "react-hook-form"

export default function FileUploader({
    dropZoneConfig = {
        maxFiles: 5,
        maxSize: 1024 * 1024 * 4,
        multiple: true,
    },
    label,
    control,
    name,
    acceptedFileTypes,
}: {
    dropZoneConfig?: DropzoneOptions
    label?: string
    control: Control
    name: string
    acceptedFileTypes?: string[]
}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <FileUploaderComponent
                            value={field.value}
                            onValueChange={(files) => {
                                field.onChange(files)
                            }}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-background rounded-lg p-2"
                        >
                            <FileInput
                                id="fileInput"
                                className="outline-dashed outline-1 outline-slate-500"
                                {...control.register(name)}
                            >
                                <div className="flex items-center justify-center flex-col p-8 w-full ">
                                    <CloudUpload className="text-gray-400 w-8 h-8" />
                                    <p className="mb-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 md:text-left text-center">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>
                                        &nbsp; or drag and drop
                                    </p>
                                    {acceptedFileTypes && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 md:text-left text-center sm:mt-0 mt-1">
                                            {acceptedFileTypes?.join(", ")}{" "}
                                            files only.
                                        </p>
                                    )}
                                </div>
                            </FileInput>
                            <FileUploaderContent>
                                {field.value &&
                                    field.value.length > 0 &&
                                    field.value.map((file: File, i: number) => (
                                        <FileUploaderItem key={i} index={i}>
                                            <Paperclip className="h-4 w-4 stroke-current" />
                                            <span>{file.name}</span>
                                        </FileUploaderItem>
                                    ))}
                            </FileUploaderContent>
                        </FileUploaderComponent>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
