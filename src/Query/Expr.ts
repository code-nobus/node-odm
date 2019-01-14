import {Cloneable, Cloner} from "@sirian/clone";
import {Condition} from "mongodb";
import {AbstractExpr} from "./AbstractExpr";

export class Expr<T = any, K extends keyof T = keyof T> extends AbstractExpr implements Cloneable {
    protected expr: Partial<Condition<T, K>> = {};

    constructor() {
        super();
        this.expr = {};
    }

    public clone() {
        this.expr = Cloner.clone(this.expr);
    }

    public getExpr() {
        return this.expr;
    }

    public operator<O extends keyof Condition<T, K>>(op: O, value: Condition<T, K>[O]) {
        this.expr[op] = value;
        return this;
    }
}
