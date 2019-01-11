import {XMap} from "@sirian/common";
import {Annotation} from "./Annotation";

export class AnnotationRegistry {
    protected map: XMap<typeof Annotation, Annotation[]>;

    constructor() {
        this.map = new XMap(() => []);
    }

    public add(meta: Annotation) {
        const ctor = meta.constructor as typeof Annotation;
        this.map.ensure(ctor).push(meta);
    }

    public get<M extends typeof Annotation>(ctor: M) {
        const items = this.map.get(ctor) || [];
        return [...items] as Array<InstanceType<M>>;
    }
}
