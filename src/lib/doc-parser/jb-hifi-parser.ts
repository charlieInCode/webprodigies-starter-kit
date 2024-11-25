import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import { processFile } from "../parse-xlsx"
import { MappingRow } from "./sku-mapping-parser"

dayjs.extend(weekday)

export type JbRow = {
    Store: string
    Supp_Code: string
    Qty_Sold: string
}

export const JbParser = async (
    channel: string,
    file: File,
    mappings: MappingRow[],
) => {
    const rawData = await processFile<JbRow>(file, {
        raw: false,
        dateNF: "yyyy-mm-dd",
    })

    const missMappings: string[] = []

    const currentDay = dayjs()

    // // get sku from mappings
    const result = rawData
        .map((row) => {
            const mapping = mappings.find(
                (m) => m["Data SKU"] === row.Supp_Code,
            )

            const quantity = Number(row.Qty_Sold)
            const branch = row.Store
            const createdAt = currentDay.toDate()

            if (!mapping) {
                missMappings.push(row.Supp_Code)

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
