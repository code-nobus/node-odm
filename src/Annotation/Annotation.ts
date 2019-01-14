import {Ctor} from "@sirian/ts-extra-types";

export abstract class Annotation<C extends Ctor = Ctor> {
    public readonly class: C;

    constructor(target: C) {
        this.class = target;
    }

    public abstract get registryKey(): any;
}
