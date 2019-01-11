import {Str, Var} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Args} from "@sirian/ts-extra-types";
import {RawType} from "../../Type";
import {Annotations} from "../Annotations";
import {PropertyAnnotation} from "./PropertyAnnotation";

export interface IFieldInit {
    name: string;
    type: any;
    nullable: boolean;
}

export class FieldAnnotation extends PropertyAnnotation {
    public readonly name: string;
    public readonly type: any;
    public readonly nullable: boolean;

    constructor(target: object, propertyKey: PropertyKey, opts: Partial<IFieldInit> = {}) {
        super(target, propertyKey);
        const name = opts.name || propertyKey;

        if (!FieldAnnotation.isValidFieldName(name)) {
            throw new InvalidArgumentError(`Field name "${Str.stringify(name)}" is invalid`);
        }

        this.name = Var.stringify(name);

        this.type = opts.type || RawType;
        this.nullable = opts.nullable || false;
    }

    public static isValidFieldName(name: any): name is number | string {
        if (Var.isNumber(name)) {
            return true;
        }
        if (!Var.isString(name) || !name.length) {
            return false;
        }
        return "$" !== name[0] && -1 === name.indexOf(".");
    }

    public static decorate([proto, propertyKey]: Args<PropertyDecorator>, opts: Partial<IFieldInit> = {}) {
        const meta = new FieldAnnotation(proto, propertyKey, opts);

        Annotations.add(meta);
    }
}
