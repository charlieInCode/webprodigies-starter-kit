export type GeneralPros = {
    MODE: "maintenance" | "live"
    APPLICATION_NAME: string
    SELLING_REPORT: {
        companyName: string[]
        class: string[]
    }
}

export const GENERAL: GeneralPros = {
    MODE: "live",
    APPLICATION_NAME: "Grouple.",
    SELLING_REPORT: {
        companyName: [
            "Buyerscircle",
            "Darling Baby Pty Ltd",
            "Dzign Solutions",
            "GOODMAMA",
            "HI SHOP GROUP PTY LTD",
            "Rofisbaby",
            "Lilyjoybook",
            "Techry",
        ],
        class: ["TFIVE - Other", "Electronics:imoo"],
    },
}
