import {Var} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";

export class Metadata<C extends Ctor = any> {
    public readonly class: C;

    public collectionName?: string;
    public dbName?: string;
    public isDocument: boolean;

    constructor(ctor: C) {
        if (!Var.isFunction(ctor)) {
            throw new InvalidArgumentError(`${ctor} is not a function`);
        }
        this.class = ctor;

        this.isDocument = false;
    }
}
