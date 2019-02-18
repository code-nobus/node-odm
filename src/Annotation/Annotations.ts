import {Var, XMap} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {Annotation} from "./Annotation";
import {PropertyAnnotation} from "./Property";

export class Annotations<T> {
    public static readonly map = new XMap<Function, Annotation[]>(() => []);

    public static add(annotation: Annotation) {
        const classAnnotations = Annotations.map.ensure(annotation.class);

        classAnnotations.push(annotation);

        return this;
    }

    public static getAllAnnotations(target: Ctor) {
        const annotations = this.map.get(target) || [];
        return [...annotations];
    }

    public static getAnnotation<AC extends Ctor<Annotation>>(AnnotationClass: AC, target: Ctor) {
        const annotations = this.getAllAnnotations(target);

        for (const annotation of annotations) {
            if (Var.isInstanceOf(annotation, AnnotationClass)) {
                return annotation;
            }
        }
    }

    public static getAnnotations<AC extends Ctor<Annotation>>(AnnotationClass: AC, target: Ctor) {
        return this
            .getAllAnnotations(target)
            .filter((a) => Var.isInstanceOf(a, AnnotationClass)) as Array<InstanceType<AC>>;
    }

    public static getPropertyAnnotations<AC extends Ctor<PropertyAnnotation>>(AnnotationClass: AC, target: Ctor, key: PropertyKey) {
        return this
            .getAnnotations(AnnotationClass, target)
            .filter((a) => a.propertyKey === key);
    }
}
