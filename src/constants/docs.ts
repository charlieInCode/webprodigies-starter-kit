/**
 * csv file:
 *  ✅(Amazon): Amazon - Sales_Sourcing_Retail_Australia_Weekly_06-10-2024_12-10-2024
 *  ✅(ebay - Aqara): Aqara Ebay - Transaction-Oct-14-2024-16_07_27-0700-12198756441
 *  ✅(Aqara Official Shopify): Aqara Shopify - orders_export_1
 *  ✅(BING LEE): Bing Lee - sso_weekly_data_oppo
 *  ✅(ebay - Eco Flow): EcoFlow Ebay - Transaction-Oct-14-2024-16_13_43-0700-12198757151
 *  ✅(imoo Shopify): imoo Shopify - orders_export_1
 * xlsx file:
 *  ✅(Battery World): Battery World - report
 *  ✅(Big W): Big W - Big_W_Weekly_Article_Performance
 *  ✅(JB HIFI): JB HIFI - Supplier Report
 *  (Officeworks): Officeworks - data
 *  (Techry): Weekly Sellin Report - TFIVE Sales Report 01.09.2024 - 13.10.2024
 */

export type DocProps = {
    id: string
    fileType: "csv" | "xlsx"
    maxFileSize: number
    title: string
    name: string
    parser:
        | "sku-mapping"
        | "shopify"
        | "ebay"
        | "amazon"
        | "bing-lee"
        | "battery-world"
        | "big-w"
        | "jb-hifi"
        | "officeworks"
        | "generic"
}

export const DOCS: DocProps[] = [
    {
        id: "0",
        fileType: "xlsx",
        maxFileSize: 1024 * 1024 * 4,
        title: "SKU Mapping",
        name: "sku-mapping",
        parser: "sku-mapping",
    },
    {
        id: "1",
        fileType: "csv",
        maxFileSize: 1024 * 1024 * 4,
        title: "Aqara Official Shopify",
        name: "aqara-shopify",
        parser: "shopify",
    },
    {
        id: "2",
        fileType: "csv",
        maxFileSize: 1024 * 1024 * 4,
        title: "imoo Shopify",
        name: "imoo-shopify",
        parser: "shopify",
    },
    {
        id: "3",
        fileType: "csv",
        maxFileSize: 1024 * 1024 * 4,
        title: "ebay - Aqara",
        name: "aqara-ebay",
        parser: "ebay",
    },
    {
        id: "4",
        fileType: "csv",
        maxFileSize: 1024 * 1024 * 4,
        title: "ebay - Eco Flow",
        name: "eco-flow-ebay",
        parser: "ebay",
    },
    {
        id: "5",
        fileType: "csv",
        maxFileSize: 1024 * 1024 * 4,
        title: "Amazon",
        name: "amazon",
        parser: "amazon",
    },
    {
        id: "6",
        fileType: "csv",
        maxFileSize: 1024 * 1024 * 4,
        title: "Bing Lee",
        name: "bing-lee",
        parser: "bing-lee",
    },
    {
        id: "7",
        fileType: "xlsx",
        maxFileSize: 1024 * 1024 * 4,
        title: "Battery World",
        name: "battery-world",
        parser: "battery-world",
    },
    {
        id: "8",
        fileType: "xlsx",
        maxFileSize: 1024 * 1024 * 4,
        title: "Big W",
        name: "big-w",
        parser: "big-w",
    },
    {
        id: "9",
        fileType: "xlsx",
        maxFileSize: 1024 * 1024 * 4,
        title: "JB HIFI",
        name: "jb-hifi",
        parser: "jb-hifi",
    },
    {
        id: "10",
        fileType: "xlsx",
        maxFileSize: 1024 * 1024 * 4,
        title: "Officeworks",
        name: "officeworks",
        parser: "officeworks",
    },
    {
        id: "11",
        fileType: "xlsx",
        maxFileSize: 1024 * 1024 * 4,
        title: "Weekly Sellin Report",
        name: "generic",
        parser: "generic",
    },
]
