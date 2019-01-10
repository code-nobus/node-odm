import {Ref, Var, XMap, XSet} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {ClassMeta} from "./ClassMeta";
import {Meta} from "./Meta";
import {MetaRegistry} from "./MetaRegistry";
import {PropertyMeta} from "./PropertyMeta";

export class ClassMetadata {
    public static readonly classMap = new XMap(() => new ClassMetadata());
    protected readonly meta: MetaRegistry;
    protected readonly properties: XMap<PropertyKey, MetaRegistry>;

    constructor() {
        this.meta = new MetaRegistry();
        this.properties = new XMap(() => new MetaRegistry());
    }

    public static get(target: object): ClassMetadata {
        return this.classMap.ensure(target);
    }

    public static addMeta(meta: Meta) {
        const classMetadata = this.classMap.ensure(meta.ctor);

        classMetadata.addMeta(meta);
    }

    public static getMeta<M extends Ctor<ClassMeta>>(target: object, meta: M) {
        const result = [];
        for (const obj of ClassMetadata.getProtoChain(target)) {
            const classMetadata = ClassMetadata.get(obj);
            const metas = classMetadata.getMeta(meta);
            result.unshift(...metas);
        }
        return result;
    }

    public static getPropertyMeta<M extends Ctor<PropertyMeta>>(target: object, key: PropertyKey, meta: M) {
        const result = [];
        for (const obj of ClassMetadata.getProtoChain(target)) {
            const classMetadata = ClassMetadata.get(obj);

            const metas = classMetadata.getPropertyMeta(key, meta);

            result.unshift(...metas);
        }
        return result;
    }

    protected static getProtoChain(target: object) {
        const protos = new XSet();

        let obj: any = target;

        while (Var.isFunction(obj) && !protos.has(obj)) {
            protos.add(obj);
            obj = Ref.getPrototypeOf(obj);
        }

        return [...protos];
    }

    public getMeta<M extends Ctor<ClassMeta>>(meta: M) {
        return this.meta.get(meta);
    }

    public getPropertyMeta<M extends Ctor<PropertyMeta>>(key: PropertyKey, meta: M) {
        const registry = this.properties.get(key);
        return registry ? registry.get(meta) : [];
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
