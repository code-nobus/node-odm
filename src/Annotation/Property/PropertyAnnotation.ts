import {Annotation} from "../Annotation";

export class PropertyAnnotation extends Annotation {
    public readonly proto: object;
    public readonly propertyKey: PropertyKey;

    constructor(proto: object, propertyKey: PropertyKey) {
        super(proto.constructor);

        this.proto = proto;
        this.propertyKey = propertyKey;
    }
}
