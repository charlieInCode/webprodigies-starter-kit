import csv from "csv-parser"
import { Readable } from "stream"

export const processFile = async <T>(file: File, csvOptions?: csv.Options) => {
    const results: T[] = []

    // Read file content
    const content = await file.text()

    // Create readable stream from string
    const readableStream = Readable.from(content)

    return new Promise((resolve, reject) => {
        readableStream
            .pipe(csv(csvOptions))
            .on("data", (data) => {
                results.push(data)
            })
            .on("end", () => {
                resolve(results)
            })
            .on("error", (error) => {
                console.error("Error processing CSV:", error)
                reject(error)
            })
    }) as Promise<T[]>
}
