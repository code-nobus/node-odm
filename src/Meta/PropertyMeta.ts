import {Meta} from "./Meta";

export class PropertyMeta extends Meta {
    public readonly proto: object;
    public readonly propertyKey: PropertyKey;

    constructor(proto: object, propertyKey: PropertyKey) {
        super(proto.constructor);

        this.proto = proto;
        this.propertyKey = propertyKey;
    }
}
