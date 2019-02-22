import {Var, XSet} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {Annotation} from "./Annotation";
import {PropertyAnnotation} from "./Property";

export class AnnotationRegistry<T> {
    public static readonly map: WeakMap<Function, XSet<Annotation>> = new WeakMap();

    public static add(annotation: Annotation) {
        const map = this.map;
        const ctor = annotation.class;

        if (!map.has(ctor)) {
            map.set(ctor, new XSet());
        }

        map.get(ctor)!.add(annotation);

        return this;
    }

    public static getAll(target: Ctor) {
        if (!this.map.has(target)) {
            return [];
        }

        return this.map.get(target)!.toArray();
    }

    public static get<AC extends Ctor<PropertyAnnotation>>(AnnotationClass: AC, target: Ctor, key?: PropertyKey): Array<InstanceType<AC>>;
    public static get<AC extends Ctor<Annotation>>(AnnotationClass: AC, target: Ctor): Array<InstanceType<AC>>;

    public static get<AC extends Ctor<Annotation>>(AnnotationClass: AC, target: Ctor, key?: PropertyKey) {
        const annotations = this
            .getAll(target)
            .filter((a) => Var.isInstanceOf(a, AnnotationClass));

        if (!Var.isUndefined(key)) {
            return annotations
                .filter((a) => Var.isInstanceOf(a, PropertyAnnotation) && a.propertyKey === key);
        }

        return annotations;
    }
}
