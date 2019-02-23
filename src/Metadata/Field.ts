import {Var} from "@sirian/common";

export class Field {
    public static isValidFieldName(name: any): name is number | string {
        if (Var.isNumber(name)) {
            return true;
        }
        if (!Var.isString(name) || !name.length) {
            return false;
        }
        return "$" !== name[0] && -1 === name.indexOf(".");
    }
}
