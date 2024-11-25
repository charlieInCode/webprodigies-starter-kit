import * as XLSX from "xlsx"

export const processFile = async <T>(
    file: File,
    options?: XLSX.Sheet2JSONOpts,
) => {
    // change file to buffer
    const buffer = await file.arrayBuffer()

    // read buffer
    const workbook = XLSX.read(new Uint8Array(buffer), {
        type: "array",
        cellDates: true,
        cellNF: false,
        cellText: false,
    })

    // get first sheet
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    // convert sheet to json
    const results = XLSX.utils.sheet_to_json(sheet, options)

    return results as T[]
}
