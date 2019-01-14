import {Var} from "@sirian/common";
import {Condition} from "mongodb";
import {InternalError} from "../Error";

// todo logical: and not or nor
// todo element query: exists type
// todo evaluation: expr jsonSchema, mod, regex, text, where
// todo array: all elemMatch size
// todo geospatial: geoIntersects geoWithin near nearSphere
// todo bitwise: bitsAllClear bitsAllSet bitsAnyClear bitsAnySet

export abstract class AbstractExpr<T = any, K extends keyof T = keyof T> {
    public static operator<T extends AbstractExpr>(target: T, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!Var.isFunction(descriptor.value)) {
            throw new InternalError();
        }

        const op = "$" + propertyKey;

        descriptor.value = function(this: T, value: any) {
            return this.operator(op, value);
        };

        return descriptor;
    }

    // https://docs.mongodb.com/manual/reference/operator/query/eq/
    @AbstractExpr.operator
    public eq(value: T[K]) { return this; }

    // https://docs.mongodb.com/manual/reference/operator/query/ne/
    @AbstractExpr.operator
    public ne(value: T[K]) { return this; }

    // https://docs.mongodb.com/manual/reference/operator/query/gt/
    @AbstractExpr.operator
    public gt(value: T[K]) { return this; }

    // https://docs.mongodb.com/manual/reference/operator/query/gte/
    @AbstractExpr.operator
    public gte(value: T[K]) { return this; }

    // https://docs.mongodb.com/manual/reference/operator/query/lt/
    @AbstractExpr.operator
    public lt(value: T[K]) { return this; }

    // https://docs.mongodb.com/manual/reference/operator/query/lte/
    @AbstractExpr.operator
    public lte(value: T[K]) { return this; }

    // https://docs.mongodb.com/manual/reference/operator/query/in/
    @AbstractExpr.operator
    public in(values: Array<T[K]>) { return this; }

    // https://docs.mongodb.com/manual/reference/operator/query/nin/
    @AbstractExpr.operator
    public nin(values: Array<T[K]>) { return this; }

    // https://docs.mongodb.com/manual/reference/operator/query/comment/
    @AbstractExpr.operator
    public comment(comment: string) { return this; }

    public abstract operator<O extends keyof Condition<T, K>>(op: O, value: Condition<T, K>[O]): this;
    public abstract getExpr(): any;
}
