import {Ctor} from "@sirian/ts-extra-types";
import {Annotation} from "../Annotation";

export class PropertyAnnotation<C extends Ctor = Ctor, K extends keyof InstanceType<C> = keyof InstanceType<C>> extends Annotation<C> {
    public readonly proto: InstanceType<C>;
    public readonly propertyKey: K;

    constructor(proto: InstanceType<C>, propertyKey: K) {
        super(proto.constructor);

        this.proto = proto;
        this.propertyKey = propertyKey;
    }

    public get registryKey() {
        return this.propertyKey;
    }
}
