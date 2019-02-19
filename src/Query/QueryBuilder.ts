import {Cloner} from "@sirian/clone";
import {Obj, Var} from "@sirian/common";
import {RuntimeError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {Condition, FindOneOptions} from "mongodb";
import {DocumentManager} from "../DocumentManager";
import {AbstractSelector} from "./AbstractSelector";
import {Query} from "./Query";

export type QueryObject<T, K extends keyof T = keyof T> = { [P in K]?: T[P] | Condition<T, P> };
export type QueryOptions = FindOneOptions;

export class QueryBuilder<T> extends AbstractSelector<T> {
    public readonly dm: DocumentManager;

    public readonly docClass: Ctor<T>;

    protected currentField?: keyof T;

    protected queryObject: QueryObject<T>;

    protected options: QueryOptions;

    constructor(dm: DocumentManager, docClass: Ctor<T>) {
        super();

        this.dm = dm;
        this.docClass = docClass;
        this.queryObject = {};
        this.options = {};
    }

    public setOptions(options: FindOneOptions) {
        Obj.assign(this.options, options);
        return this;
    }

    public skip(skip: number) {
        this.options.skip = skip;
        return this;
    }

    public limit(limit: number) {
        this.options.limit = limit;
        return this;
    }

    public setQueryObject(query: QueryObject<T>) {
        this.queryObject = Cloner.clone(query);
        return this;
    }

    public field<K extends keyof T>(field: K): this;
    public field<K extends keyof T>(field: K, value: T[K] | Condition<T, K>): this;
    public field(field: keyof T, ...args: any[]) {
        this.currentField = field;

        if (args.length) {
            this.queryObject[field] = args[0];
            return this;
        }

        return this;
    }

    public getQuery() {
        return new Query({
            dm: this.dm,
            docClass: this.docClass,
            queryObject: this.queryObject,
            options: this.options,
        });
    }

    public operator(op: keyof Condition<T, keyof T>, value: any) {
        const field = this.currentField;

        if (!field) {
            throw new Error("call .field() first");
        }

        const query = this.queryObject;

        if (!Var.hasOwn(query, field)) {
            query[field] = {};
        }

        const currentFieldQuery = query[field] as any;

        if (!Var.isObject(currentFieldQuery)) {
            throw new RuntimeError("Could not ");
        }

        currentFieldQuery[op] = value;

        return this;
    }

    public getQueryObject() {
        return Cloner.clone(this.queryObject);
    }
}
