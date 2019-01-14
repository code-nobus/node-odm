import {Var, XMap} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {Condition, FindOneOptions} from "mongodb";
import {DocumentManager} from "../DocumentManager";
import {AbstractExpr} from "./AbstractExpr";
import {Expr} from "./Expr";

export class QueryBuilder<T, K extends keyof T = keyof T> extends AbstractExpr<T, K> {
    protected dm: DocumentManager;

    protected class?: Ctor<T>;

    protected currentField?: K;

    protected fieldExpressions: XMap<K, Expr>;

    protected options: FindOneOptions = {};

    constructor(dm: DocumentManager, documentClass: Ctor<T>) {
        super();

        this.dm = dm;
        this.class = documentClass;
        this.fieldExpressions = new XMap(() => new Expr());
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

    public setQuery(query: object) {
        // todo:
        return this;
    }

    public clone() {
        return this;
    }

    public field(field: K): this;
    public field(field: K, value: Expr): this;

    public field(field: K, ...args: any[]) {
        this.currentField = field;

        if (!args.length) {
            return this;
        }

        const arg = args[0];

        if (Var.isInstanceOf(arg, Expr)) {
            this.fieldExpressions.set(field, arg);
            return this;
        }

        if (Var.isFunction(arg)) {
            const expr = this.fieldExpressions.ensure(field);
            arg(expr);
        } else {
            this.fieldExpressions.delete(field);
        }

        return this;
    }

    public operator<O extends keyof Condition<T, K>>(op: O, value: Condition<T, K>[O]) {
        const field = this.currentField;

        if (!field) {
            throw new Error("call .field() first");
        }

        const fieldExpr = this.fieldExpressions.ensure(field);

        fieldExpr.operator(op, value);

        return this;
    }

    public getExpr() {
        const result: any = {};

        for (const [key, value] of this.fieldExpressions.entries()) {
            result[key] = value instanceof AbstractExpr ? value.getExpr() : value;
        }

        return result;
    }
}
