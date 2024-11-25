import { DocProps, DOCS } from "./docs"
import { AuthFormProps, SIGN_IN_FORM } from "./forms"
import { GENERAL, GeneralPros } from "./general"

type ConstantsPros = {
    general: GeneralPros
    signInForm: AuthFormProps[]
    docs: DocProps[]
}

export const CONSTANTS: ConstantsPros = {
    general: GENERAL,
    signInForm: SIGN_IN_FORM,
    docs: DOCS,
}
