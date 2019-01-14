import {Ref, Var, XMap} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {BadMethodCallError} from "../Error";
import {Annotation} from "./Annotation";
import {AnnotationRegistry} from "./AnnotationRegistry";
import {ClassAnnotation} from "./Class";
import {PropertyAnnotation} from "./Property";

export class Annotations<T> {
    public static readonly classMap = new XMap((target) => new Annotations<any>(target));

    public readonly class: T;

    protected readonly registries: XMap<PropertyKey, AnnotationRegistry>;

    constructor(target: T) {
        this.class = target;
        this.registries = new XMap(() => new AnnotationRegistry());
    }

    public static add(annotation: Annotation) {
        const instance = Annotations.classMap.ensure(annotation.class);

        const key = annotation.registryKey;

        instance.registries.ensure(key).add(annotation);
    }

    public static get<A extends Ctor<PropertyAnnotation>>(AnnotationClass: A, target: object, propertyKey: PropertyKey): Array<InstanceType<A>>;
    public static get<A extends Ctor<ClassAnnotation>>(AnnotationClass: A, target: object): Array<InstanceType<A>>;

    public static get<A extends Ctor<Annotation>>(AnnotationClass: A, target: object, propertyKey?: PropertyKey) {
        const result: Array<InstanceType<A>> = [];

        for (const obj of Ref.getProtoChain(target)) {
            const registry = Annotations.getRegistry(AnnotationClass, obj, propertyKey);
            if (!registry) {
                continue;
            }
            const values = registry.get(AnnotationClass);
            if (values) {
                result.unshift(...values);
            }
        }

        return result;

    }

    protected static getRegistry<A extends Ctor<Annotation>>(AnnotationClass: A, target: object, propertyKey?: PropertyKey) {
        const instance = this.classMap.get(target);
        if (!instance) {
            return;
        }

        const key = this.resolveRegistryKey(AnnotationClass, propertyKey);
        return instance.registries.get(key);
    }

    protected static resolveRegistryKey<A extends Ctor<Annotation>>(AnnotationClass: A, propertyKey?: PropertyKey) {
        if (Var.isSubclassOf(AnnotationClass, ClassAnnotation)) {
            return ClassAnnotation.registryKey;
        }

        if (Var.isSubclassOf(AnnotationClass, PropertyAnnotation)) {
            if (!propertyKey) {
                throw new BadMethodCallError(`Property key is required for ${AnnotationClass.name}`);
            }
            return propertyKey;
        }

        throw new BadMethodCallError(`Expected subclass of ${PropertyAnnotation.name} or ${ClassAnnotation.name}`);
    }
}
