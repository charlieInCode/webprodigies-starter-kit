import { processFile } from "../parse-csv"
import { MappingRow } from "./sku-mapping-parser"

type AmazonRow = {
    ASIN: string
    "Shipped Units": string
}

export const amazonParser = async (
    channel: string,
    file: File,
    mappings: MappingRow[],
) => {
    // csv file for ebay
    const rawData = await processFile<AmazonRow>(file, {
        skipLines: 1,
    })

    const missMappings: string[] = []

    // get sku from mappings
    const result = rawData
        .map((row) => {
            const mapping = mappings.find((m) => m["Data SKU"] === row.ASIN)

            if (!mapping) {
                missMappings.push(row.ASIN)
                return {
                    channel,
                    branch: "",
                    sku: "MISSING-MAPPING",
                    quantity: Number(row["Shipped Units"]),
                    createdAt: new Date(),
                }
            }

            if (!row["Shipped Units"]) {
                return null
            }

            return {
                channel,
                branch: "",
                sku: mapping["Data SKU"],
                quantity: Number(row["Shipped Units"]),
                createdAt: new Date(),
            }
        })
        .filter((ele) => !!ele)

    return {
        data: result,
        missMappings,
    }
}
