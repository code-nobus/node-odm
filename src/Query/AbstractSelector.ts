import {Var} from "@sirian/common";
import {InternalError} from "../Error";

/**
 * todo logical: and not or nor
 * todo element query: exists type
 * todo evaluation: expr jsonSchema, mod, regex, text, where
 * todo array: all elemMatch size
 * todo geospatial: geoIntersects geoWithin near nearSphere
 * todo bitwise: bitsAllClear bitsAllSet bitsAnyClear bitsAnySet
 */

export abstract class AbstractSelector<T = any> {
    public static operator<T extends AbstractSelector>(target: T, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!Var.isFunction(descriptor.value)) {
            throw new InternalError();
        }

        const op = "$" + propertyKey;

        descriptor.value = function(this: T, value: any) {
            return this.operator(op, value);
        };

        return descriptor;
    }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/eq/
     */
    @AbstractSelector.operator
    public eq<K extends keyof T>(value: T[K]) { return this; }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/ne/
     */
    @AbstractSelector.operator
    public ne<K extends keyof T>(value: T[K]) { return this; }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/gt/
     */
    @AbstractSelector.operator
    public gt<K extends keyof T>(value: T[K]) { return this; }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/gte/
     */
    @AbstractSelector.operator
    public gte<K extends keyof T>(value: T[K]) { return this; }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/lt/
     */
    @AbstractSelector.operator
    public lt<K extends keyof T>(value: T[K]) { return this; }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/lte/
     */
    @AbstractSelector.operator
    public lte<K extends keyof T>(value: T[K]) { return this; }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/in/
     */
    @AbstractSelector.operator
    public in<K extends keyof T>(values: Array<T[K]>) { return this; }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/nin/
     */
    @AbstractSelector.operator
    public nin<K extends keyof T>(values: Array<T[K]>) { return this; }

    /**
     * https://docs.mongodb.com/manual/reference/operator/query/comment/
     */
    @AbstractSelector.operator
    public comment(comment: string) { return this; }

    public abstract operator(op: string, value: any): this;
}
