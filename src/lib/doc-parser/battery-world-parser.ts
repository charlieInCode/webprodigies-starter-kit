import { processFile } from "../parse-xlsx"
import { MappingRow } from "./sku-mapping-parser"

export type BatteryWorldRow = {
    Location: string
    Item: string
    Type: string
    Date: string
    "Qty. Sold": string
}

export const batteryWorldParser = async (
    channel: string,
    file: File,
    mappings: MappingRow[],
) => {
    const rawData = await processFile<BatteryWorldRow>(file, {
        range: { s: { c: 0, r: 6 }, e: { c: 50, r: 1000 } },
        raw: false,
        dateNF: "yyyy-mm-dd",
    })

    const missMappings: string[] = []

    // get sku from mappings
    const result = rawData
        .map((row) => {
            const mapping = mappings.find((m) => m["Data SKU"] === row.Item)

            const branch = row.Location.replace("Battery World", "").trim()
            const quantity = Number(row["Qty. Sold"])
            const createdAt = new Date(row.Date)

            if (branch === "Total") {
                return null
            }

            if (!mapping) {
                missMappings.push(row.Item)

                return {
                    channel,
                    branch,
                    sku: "MISSING-MAPPING",
                    quantity,
                    createdAt,
                }
            }

            return {
                channel,
                branch,
                sku: mapping["Data SKU"],
                quantity,
                createdAt,
            }
        })
        .filter((ele) => !!ele)

    return {
        data: result,
        missMappings,
    }
}
