import {XMap} from "@sirian/common";
import {Meta} from "./Meta";

export class MetaRegistry {
    protected map: XMap<typeof Meta, Meta[]>;

    constructor() {
        this.map = new XMap(() => []);
    }

    public add(meta: Meta) {
        const ctor = meta.constructor as typeof Meta;
        this.map.ensure(ctor).push(meta);
    }

    public get<M extends typeof Meta>(ctor: M) {
        const items = this.map.get(ctor) || [];
        return items as Array<InstanceType<M>>;
    }
}
