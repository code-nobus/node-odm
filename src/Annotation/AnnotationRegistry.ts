import {XMap} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {Annotation} from "./Annotation";

export class AnnotationRegistry {
    protected map: XMap<Ctor<Annotation>, Annotation[]>;

    constructor() {
        this.map = new XMap(() => []);
    }

    public add(meta: Annotation) {
        const ctor = meta.constructor as Ctor<Annotation>;
        this.map.ensure(ctor).push(meta);
    }

    public get<M extends Ctor<Annotation>>(ctor: M) {
        return this.map.get(ctor) as ReadonlyArray<InstanceType<M>> | undefined;
    }
}
