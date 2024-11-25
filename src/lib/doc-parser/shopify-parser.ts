import { processFile } from "../parse-csv"

type ShopifyRow = {
    "Financial Status": string
    "Lineitem quantity": string
    "Lineitem sku": string
    "Created at": string
}

export const shopifyParser = async (channel: string, file: File) => {
    // csv file for shopify
    const rawData = await processFile<ShopifyRow>(file)

    let previousRow = rawData[0]

    const result = rawData
        .map((row) => {
            if (row["Financial Status"] === "") {
                // if Financial Status is empty, use previous row's Financial Status
                row["Financial Status"] = previousRow["Financial Status"]
            }

            previousRow = row

            if (row["Financial Status"] !== "paid") {
                return null
            }

            return {
                channel,
                branch: "",
                quantity: Number(row["Lineitem quantity"]),
                sku: row["Lineitem sku"],
                createdAt: new Date(row["Created at"]),
            }
        })
        .filter((ele) => !!ele)

    // sort by createdAt desc
    result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return result
}
