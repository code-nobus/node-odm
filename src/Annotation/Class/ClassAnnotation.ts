import {Ctor} from "@sirian/ts-extra-types";
import {Annotation} from "../Annotation";

export class ClassAnnotation<C extends Ctor = Ctor> extends Annotation<C> {
    public static readonly registryKey: unique symbol = Symbol();

    public get registryKey() {
        return ClassAnnotation.registryKey;
    }
}
