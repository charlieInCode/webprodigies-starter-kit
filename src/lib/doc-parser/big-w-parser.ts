import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import { processFile } from "../parse-xlsx"
import { MappingRow } from "./sku-mapping-parser"

dayjs.extend(weekday)

export type BigWRow = {
    "Week End Date Text_7": string
    [date: string]: string
}

export const bigWParser = async (
    channel: string,
    file: File,
    mappings: MappingRow[],
) => {
    const rawData = await processFile<BigWRow>(file, {
        raw: false,
        dateNF: "yyyy-mm-dd",
    })

    const missMappings: string[] = []

    const currentDay = dayjs()

    // get last week's Sunday
    const lastSundayString = currentDay.weekday(0).format("YYYY-MM-DD")

    // find all the relevant column
    const relevantData = Object.keys(rawData[0]).filter((key) => {
        return key.includes(lastSundayString)
    })

    if (relevantData.length === 0) {
        throw new Error(
            "BigW: No data found for last Sunday " + lastSundayString,
        )
    }

    // use the shortest column as the reference
    const shortestColumn = relevantData.reduce((prev, current) =>
        prev.length < current.length ? prev : current,
    )

    // get sku from mappings
    const result = rawData
        .map((row) => {
            const mapping = mappings.find(
                (m) => m["Data SKU"] === row["Week End Date Text_7"],
            )

            const quantity = Number(row[shortestColumn])
            const createdAt = currentDay.toDate()

            if (isNaN(quantity)) {
                return null
            }

            if (!mapping) {
                missMappings.push(row["Week End Date Text_7"])

                return {
                    channel,
                    branch: "",
                    sku: "MISSING-MAPPING",
                    quantity,
                    createdAt,
                }
            }

            return {
                channel,
                branch: "",
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
