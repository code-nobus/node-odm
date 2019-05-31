import {Cloneable, Cloner, cloneSymbol} from "@sirian/clone";
import {Condition} from "mongodb";
import {AbstractSelector} from "./AbstractSelector";

export class Selector<T = any, K extends keyof T = keyof T> extends AbstractSelector implements Cloneable {
    protected queryObject?: Partial<Condition<T, K>> = {};

    constructor() {
        super();
    }

    public [cloneSymbol]() {
        this.queryObject = Cloner.clone(this.queryObject);
    }

    public operator<O extends keyof Condition<T, K>>(op: O, value: Condition<T, K>[O]) {
        if (!this.queryObject) {
            this.queryObject = {};
        }
        this.queryObject[op] = value;
        return this;
    }

    public getQueryObject() {
        return Cloner.clone(this.queryObject);
    }
}
