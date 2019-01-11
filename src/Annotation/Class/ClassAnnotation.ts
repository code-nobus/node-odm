import {Annotation} from "../Annotation";

export class ClassAnnotation extends Annotation {
    public static readonly registryKey: unique symbol = Symbol();

    public get registryKey() {
        return ClassAnnotation.registryKey;
    }
}
