import {XMap} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {ClassMeta} from "./ClassMeta";
import {Meta} from "./Meta";
import {MetaRegistry} from "./MetaRegistry";
import {PropertyMeta} from "./PropertyMeta";

export class ClassMetadata<T, K extends keyof T = keyof T> {
    public static readonly classMap = new XMap(() => new ClassMetadata<any, any>());
    protected readonly meta: MetaRegistry;
    protected readonly properties: XMap<K, MetaRegistry>;

    constructor() {
        this.meta = new MetaRegistry();
        this.properties = new XMap(() => new MetaRegistry());
    }

    public static get<T extends Ctor>(target: T): ClassMetadata<InstanceType<T>> {
        return this.classMap.ensure(target);
    }

    public static addMeta(meta: Meta) {
        const classMetadata = this.classMap.ensure(meta.ctor);

        classMetadata.addMeta(meta);
    }

    public getMeta<M extends Ctor<ClassMeta>>(meta: M) {
        return this.meta.get(meta);
    }

    public getPropertyMeta<M extends Ctor<PropertyMeta>>(key: K, meta: M) {
        const registry = this.properties.get(key);

        if (!registry) {
            return [];
        }

        return registry.get(meta);
    }

    public addMeta(meta: Meta) {
        if (meta instanceof PropertyMeta) {
            this.properties.ensure(meta.propertyKey as any).add(meta);
        }

        if (meta instanceof ClassMeta) {
            this.meta.add(meta);
        }
    }
}
