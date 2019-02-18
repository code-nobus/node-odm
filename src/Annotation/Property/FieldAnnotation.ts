import {Var} from "@sirian/common";
import {PropertyAnnotation} from "./PropertyAnnotation";

export interface IFieldAnnotationOptions {
    name?: string;
    type?: any;
    nullable?: boolean;
}

export class FieldAnnotation extends PropertyAnnotation<IFieldAnnotationOptions> {
    public static isValidFieldName(name: any): name is number | string {
        if (Var.isNumber(name)) {
            return true;
        }
        if (!Var.isString(name) || !name.length) {
            return false;
        }
        return "$" !== name[0] && -1 === name.indexOf(".");
    }

    protected init() {

    }
}
