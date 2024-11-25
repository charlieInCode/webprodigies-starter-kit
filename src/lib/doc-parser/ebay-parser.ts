import { processFile } from "../parse-csv"

type EbayRow = {
    Type: "Order" | "Hold"
    "Transaction creation date": string
    Quantity: string
    "Custom label": string
}

export const ebayParser = async (channel: string, file: File) => {
    // csv file for ebay
    const rawData = await processFile<EbayRow>(file, {
        skipLines: 11,
    })

    const result = rawData
        .filter((d) => d.Type === "Order")
        .map((row) => {
            return {
                channel,
                branch: "",
                quantity: Number(row["Quantity"]),
                sku: row["Custom label"],
                createdAt: new Date(row["Transaction creation date"]),
            }
        })

    // // sort by createdAt desc
    result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return result
}
