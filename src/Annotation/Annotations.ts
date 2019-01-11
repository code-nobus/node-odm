import {Ref, Var, XMap} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {Annotation} from "./Annotation";
import {AnnotationRegistry} from "./AnnotationRegistry";
import {ClassAnnotation} from "./Class";
import {PropertyAnnotation} from "./Property";

export class Annotations<T extends object> {
    public static readonly classMap = new XMap((target) => new Annotations<object>(target));

    public readonly target: T;

    protected readonly registries: XMap<PropertyKey, AnnotationRegistry>;

    constructor(target: T) {
        this.target = target;

        this.registries = new XMap(() => new AnnotationRegistry());
    }

    public static add(annotation: Annotation) {
        const instance = Annotations.classMap.ensure(annotation.class);

        const key = annotation.registryKey;

        instance.registries.ensure(key).add(annotation);
    }

    public static get<A extends Ctor<PropertyAnnotation>>(ctor: A, target: object, propertyKey: PropertyKey): Array<InstanceType<A>>;
    public static get<A extends Ctor<ClassAnnotation>>(ctor: A, target: object): Array<InstanceType<A>>;

    public static get<A extends Ctor<Annotation>>(ctor: A, target: object, propertyKey?: PropertyKey) {
        const result: Array<InstanceType<A>> = [];

        for (const obj of Ref.getProtoChain(target)) {
            const registry = Annotations.getRegistry(ctor, obj, propertyKey);
            if (!registry) {
                continue;
            }
            const values = registry.get(ctor);
            if (values) {
                result.unshift(...values);
            }
        }

        return result;

    }

    protected static getRegistry<A extends Ctor<Annotation>>(ctor: A, target: object, propertyKey?: PropertyKey) {
        const instance = this.classMap.get(target);
        if (!instance) {
            return;
        }

        const key = this.resolveRegistryKey(ctor, propertyKey);
        return instance.registries.get(key);
    }

    protected static resolveRegistryKey<A extends Ctor<Annotation>>(ctor: A, propertyKey?: PropertyKey) {
        if (Var.isSubclassOf(ctor, ClassAnnotation)) {
            return ClassAnnotation.registryKey;
        }

        if (Var.isSubclassOf(ctor, PropertyAnnotation)) {
            if (!propertyKey) {
                throw new InvalidArgumentError(`Property key is required for ${ctor.name}`);
            }
            return propertyKey;
        }

        throw new InvalidArgumentError(`Expected subclass of ${PropertyAnnotation.name} or ${ClassAnnotation.name}`);
    }
}
