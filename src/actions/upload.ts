"use server"

import { CONSTANTS } from "@/constants"
import { amazonParser } from "@/lib/doc-parser/amazon-parser"
import { batteryWorldParser } from "@/lib/doc-parser/battery-world-parser"
import { bigWParser } from "@/lib/doc-parser/big-w-parser"
import { bingLeeParser } from "@/lib/doc-parser/bing-lee-parser"
import { ebayParser } from "@/lib/doc-parser/ebay-parser"
import { genericParser } from "@/lib/doc-parser/generic-parser"
import { JbParser } from "@/lib/doc-parser/jb-hifi-parser"
import { officeworksParser } from "@/lib/doc-parser/officeworks-parser"
import { shopifyParser } from "@/lib/doc-parser/shopify-parser"
import { skuMappingParser } from "@/lib/doc-parser/sku-mapping-parser"

export const onUploadFiles = async (files: { [fileName: string]: File[] }) => {
    const data: {
        channel: string
        branch: string
        quantity: number
        sku: string
        createdAt: Date
    }[] = []

    const missingMappingData: Record<string, string[]> = {}

    const mappingFile: File | undefined = files?.["sku-mapping"]?.[0]

    if (!mappingFile) {
        throw new Error("No mapping file found")
    }

    const mappingData = await skuMappingParser(mappingFile)

    delete files["sku-mapping"]

    for (const [channel, [file]] of Object.entries(files)) {
        const config = CONSTANTS.docs.find((doc) => doc.name === channel)

        if (!config) {
            throw new Error(`No config found for file: ${channel}`)
        }

        switch (config?.parser) {
            case "shopify":
                const shopifyData = await shopifyParser(channel, file)
                data.push(...shopifyData)
                break
            case "ebay":
                const ebayData = await ebayParser(channel, file)
                data.push(...ebayData)
                break
            case "amazon":
                const amazonData = await amazonParser(
                    channel,
                    file,
                    mappingData,
                )
                data.push(...amazonData.data)

                if (amazonData.missMappings.length > 0) {
                    missingMappingData[channel] = amazonData.missMappings
                }

                break
            case "bing-lee":
                const bingLeeData = await bingLeeParser(
                    channel,
                    file,
                    mappingData,
                )
                data.push(...bingLeeData.data)

                break
            case "battery-world":
                const batteryWorldData = await batteryWorldParser(
                    channel,
                    file,
                    mappingData,
                )
                data.push(...batteryWorldData.data)

                if (batteryWorldData.missMappings.length > 0) {
                    missingMappingData[channel] = batteryWorldData.missMappings
                }

                break
            case "big-w":
                const bigWData = await bigWParser(channel, file, mappingData)
                data.push(...bigWData.data)

                if (bigWData.missMappings.length > 0) {
                    missingMappingData[channel] = bigWData.missMappings
                }

                break
            case "jb-hifi":
                const jbData = await JbParser(channel, file, mappingData)
                data.push(...jbData.data)

                if (jbData.missMappings.length > 0) {
                    missingMappingData[channel] = jbData.missMappings
                }

                break
            case "officeworks":
                const officeworksData = await officeworksParser(
                    channel,
                    file,
                    mappingData,
                )
                data.push(...officeworksData.data)

                if (officeworksData.missMappings.length > 0) {
                    missingMappingData[channel] = officeworksData.missMappings
                }

                break
            case "generic":
                const genericData = await genericParser(channel, file)

                data.push(...genericData)

                break
            default:
                throw new Error(`No parser found for file: ${channel}`)
        }
    }

    return {
        data,
        missingMappingData,
    }
}
