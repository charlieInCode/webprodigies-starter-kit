import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import { processFile } from "../parse-xlsx"
import { convertDateExcel } from "../utils"
import { MappingRow } from "./sku-mapping-parser"

dayjs.extend(weekday)

export type OfficeworksRow = {
    "Week End Date Text_7": string
    [date: string]: string
}

export const officeworksParser = async (
    channel: string,
    file: File,
    mappings: MappingRow[],
) => {
    const rawData = await processFile<OfficeworksRow>(file, {
        raw: false,
    })

    const header = Object.keys(rawData[0])

    // remove first column
    rawData.shift()

    const dateArr: string[] = []

    for (const key of header) {
        if (key.match(/^4\d{4}$/)) {
            dateArr.push(key)
        }
    }

    // get the two largest date
    const lastTwoDate = dateArr
        .sort((a, b) => Number(b) - Number(a))
        .slice(0, 2)

    const currentDay = dayjs()
    const lastMonday = currentDay.weekday(-6)
    // // get last week's Monday
    const lastMondayString = lastMonday.format("DD/MM/YYYY")

    const matchedDate = lastTwoDate.findIndex((date) => {
        const t = convertDateExcel(Number(date))

        return dayjs(t).format("DD/MM/YYYY") === lastMondayString
    })

    if (matchedDate === -1) {
        throw new Error(
            "Officeworks: No data found for last Monday " + lastMondayString,
        )
    }

    const missMappings: string[] = []

    const result = rawData
        .map((row) => {
            // get the matching date
            const quantity = Number(row[lastTwoDate[matchedDate]])
            const rawSku = row["__EMPTY_2"]

            const mapping = mappings.find((m) => m["Data SKU"] === rawSku)

            if (isNaN(quantity) || !rawSku) {
                return null
            }

            if (!mapping) {
                missMappings.push(rawSku)

                return {
                    channel,
                    branch: "",
                    sku: "MISSING-MAPPING",
                    quantity,
                    createdAt: lastMonday.toDate(),
                }
            }

            return {
                channel,
                branch: "",
                sku: mapping["Data SKU"],
                quantity,
                createdAt: lastMonday.toDate(),
            }
        })
        .filter((ele) => !!ele)

    return {
        data: result,
        missMappings,
    }
}
