import {Cloner} from "@sirian/clone";
import {Var} from "@sirian/common";
import {RuntimeError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {Condition, FilterQuery, FindOneOptions} from "mongodb";
import {DocumentManager} from "../DocumentManager";
import {AbstractSelector} from "./AbstractSelector";
import {Query} from "./Query";

export type QueryObject<T, K extends keyof T = keyof T> = { [P in K]?: T[P] | Condition<T, P> };

export class QueryBuilder<T> extends AbstractSelector<T> {
    protected dm: DocumentManager;

    protected documentClass: Ctor<T>;

    protected currentField?: keyof T;

    protected queryObject: QueryObject<T>;

    protected options: FindOneOptions = {};

    constructor(dm: DocumentManager, documentClass: Ctor<T>) {
        super();

        this.dm = dm;
        this.documentClass = documentClass;
        this.queryObject = {};
    }

    public setOptions(options: FindOneOptions) {
        Object.assign(this.options, options);
        return this;
    }

    public skip(skip: number) {
        return this.setOptions({skip});
    }

    public limit(limit: number) {
        return this.setOptions({limit});
    }

    public setQueryObject(query: FilterQuery<T>) {
        this.queryObject = Cloner.clone(query);
        return this;
    }

    public clone() {
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
        // todo
        return new Query(this.dm, this.documentClass);
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
