import { processFile } from "../parse-csv"
import { MappingRow } from "./sku-mapping-parser"

type BingLeeRow = {
    report_date: string
    product_code: string
    measure_type: "Stock" | "Sales" | "Orders"
    product_description: string
    product_gtin_ean: string
    total: string
    null: string
    [branch: string]: string
}

export const bingLeeParser = async (
    channel: string,
    file: File,
    mappings: MappingRow[],
) => {
    // csv file for ebay
    const rawData = await processFile<BingLeeRow>(file)

    const result = rawData
        .flatMap((row) => {
            const mapping = mappings.find(
                (m) => m["Data SKU"] === row.product_code,
            )

            if (!mapping || row.measure_type !== "Sales") {
                return null
            }

            // report_date: 240910 -> 10/09/2024
            const dateStr = row.report_date
            const year = parseInt(dateStr.substring(0, 2)) + 2000 // Convert YY to YYYY
            const month = parseInt(dateStr.substring(2, 4))
            const day = parseInt(dateStr.substring(4, 6))

            // Create a Date object with the parsed values
            const createdAt = new Date(year, month - 1, day)

            // split branch, remove other columns
            const branches = Object.keys(row).filter(
                (key) =>
                    key !== "report_date" &&
                    key !== "product_code" &&
                    key !== "product_description" &&
                    key !== "measure_type" &&
                    key !== "total" &&
                    key !== "product_gtin_ean" &&
                    key !== "null",
            )

            return branches
                .map((branch) => {
                    if (row[branch] === "0") {
                        return null
                    }

                    return {
                        channel,
                        branch,
                        sku: mapping["Data SKU"],
                        quantity: Number(row[branch]),
                        createdAt,
                    }
                })
                .filter((ele) => !!ele)
        })
        .filter((ele) => !!ele)

    return {
        data: result,
    }
}
