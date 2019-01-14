import {Var, XMap} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";

export class Metadata<C extends Ctor> {
    protected static map = new XMap((target: Ctor) => new Metadata(target));

    public readonly class: C;

    constructor(ctor: C) {
        if (!Var.isFunction(ctor)) {
            throw new InvalidArgumentError(`${ctor} is not a function`);
        }

        this.class = ctor;
    }

    public static get<C extends Ctor>(ctor: C) {
        return this.map.ensure(ctor);
    }

    public static isDocument(target: any) {
        if (!Var.isFunction(target)) {
            return false;
        }
        return Metadata.get(target).isDocument();
    }

    public isDocument() {
        return true; // todo
    }
}
