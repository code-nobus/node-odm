import {Ref, XMap} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {Annotation} from "./Annotation";
import {AnnotationRegistry} from "./AnnotationRegistry";
import {ClassAnnotation} from "./Class";
import {PropertyAnnotation} from "./Property";

export class Annotations<T> {
    public static readonly classMap = new XMap((target) => new Annotations<any>(target));

    public readonly target: T;

    protected readonly registry: AnnotationRegistry;
    protected readonly properties: XMap<PropertyKey, AnnotationRegistry>;

    constructor(target: T) {
        this.target = target;

        this.registry = new AnnotationRegistry();
        this.properties = new XMap(() => new AnnotationRegistry());
    }

    public static add(meta: Annotation) {
        const instance = Annotations.classMap.ensure(meta.ctor);

        if (meta instanceof PropertyAnnotation) {
            instance.properties.ensure(meta.propertyKey).add(meta);
        }

        if (meta instanceof ClassAnnotation) {
            instance.registry.add(meta);
        }
    }

    public static get<M extends Ctor<Annotation>>(meta: any, target: object, propertyKey?: PropertyKey) {
        const result: Array<InstanceType<M>> = [];

        for (const obj of Ref.getProtoChain(target)) {
            const instance = this.classMap.get(obj);
            if (!instance) {
                continue;
            }
            const values = instance.get(meta, propertyKey);
            if (values) {

                result.unshift(...values);
            }
        }

        return result;

    }

    public get<M extends Ctor<Annotation>>(meta: M, propertyKey?: PropertyKey) {
        const registry = propertyKey ? this.properties.get(propertyKey) : this.registry;
        return registry ? registry.get(meta) : [];
    }
}
