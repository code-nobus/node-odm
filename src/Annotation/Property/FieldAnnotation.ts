import {Var} from "@sirian/common";
import {fmt} from "@sirian/format";
import {Args, Ctor} from "@sirian/ts-extra-types";
import {AnnotationError} from "../../Error";
import {RawType} from "../../Type";
import {Annotations} from "../Annotations";
import {PropertyAnnotation} from "./PropertyAnnotation";

export interface IFieldInit {
    name: string;
    type: any;
    nullable: boolean;
}

export class FieldAnnotation<C extends Ctor = Ctor, K extends keyof InstanceType<C> = keyof InstanceType<C>> extends PropertyAnnotation<C, K> {
    public readonly name: string;
    public readonly type: any;
    public readonly nullable: boolean;

    constructor(proto: InstanceType<C>, propertyKey: K, opts: Partial<IFieldInit> = {}) {
        super(proto, propertyKey);
        const options = {
            name: propertyKey,
            type: RawType,
            nullable: false,
            ...opts,
        };

        const name = options.name;

        if (!FieldAnnotation.isValidFieldName(name)) {
            throw new AnnotationError(fmt`Field name "${name}" for "${proto.constructor.name}.${propertyKey}"`);
        }

        this.name = Var.stringify(name);

        this.type = options.type;
        this.nullable = options.nullable || false;
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

    public static decorate([proto, propertyKey]: Args<PropertyDecorator>, opts?: Partial<IFieldInit>) {
        Annotations.add(new FieldAnnotation(proto, propertyKey, opts));
    }
}
