import { CONSTANTS } from "@/constants"
import { processFile } from "../parse-xlsx"

type GenericRow = {
    "Item Type": string
    SKU: string
    Description: string
    Date: Date
    Week: string
    Month: string
    Quarter: string
    Year: string
    "Document Number": string
    "Qty. Sold": number
    "Unit Price": number
    Amount: number
    "Customer/Project: Company Name": string
    "Customer/Project: Customer Channel": string
    "Series: Name": string
    Class: string
}

const companyNameList = CONSTANTS.general.SELLING_REPORT.companyName
const classList = CONSTANTS.general.SELLING_REPORT.class

export const genericParser = async (channel: string, file: File) => {
    const rawData = await processFile<GenericRow>(file)

    const result = rawData
        .map((row) => {
            const companyName = row["Customer/Project: Company Name"]
            const companyClass = row["Class"]

            if (
                !companyNameList.includes(companyName) &&
                !classList.includes(companyClass)
            ) {
                return null
            }

            return {
                channel: companyName,
                branch: "online",
                quantity: row["Qty. Sold"],
                sku: row["SKU"],
                createdAt: row["Date"],
            }
        })
        .filter((ele) => !!ele)

    return result
}
