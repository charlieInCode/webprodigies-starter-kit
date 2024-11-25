import { processFile } from "../parse-xlsx"

export type MappingRow = {
    "Data SKU": string
    "Report SKU": string
}

export const skuMappingParser = async (file: File) => {
    return processFile<MappingRow>(file)
}
