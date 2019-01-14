import {Cloneable, Cloner} from "@sirian/clone";
import {Condition} from "mongodb";
import {AbstractExpr} from "./AbstractExpr";

export class Expr<T = any, K extends keyof T = keyof T> extends AbstractExpr implements Cloneable {
    protected condition: Partial<Condition<T, K>> = {};

    constructor(condition: Partial<Condition<T, K>> = {}) {
        super();
        this.condition = {...condition};
    }

    public clone() {
        this.condition = Cloner.clone(this.condition);
    }

    public getCondition() {
        return this.condition;
    }

    public operator<O extends keyof Condition<T, K>>(op: O, value: Condition<T, K>[O]) {
        this.condition[op] = value;
        return this;
    }
}
