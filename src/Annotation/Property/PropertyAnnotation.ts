import {Annotation} from "../Annotation";
import {Annotations} from "../Annotations";

export type PropertyAnnotationCtor<O> = new(object: object, k: PropertyKey, opts?: O) => PropertyAnnotation<O>;

export class PropertyAnnotation<O = any> extends Annotation<O> {
    public readonly proto: object;
    public readonly propertyKey: PropertyKey;

    constructor(proto: object, propertyKey: PropertyKey, opts?: O) {
        super(proto.constructor, opts);

        this.proto = proto;
        this.propertyKey = propertyKey;
    }

    public static decorate<O>(this: PropertyAnnotationCtor<O>, opts?: O) {
        return (proto: object, propertyKey: PropertyKey) => {
            Annotations.add(new this(proto, propertyKey, opts));
        };
    }
}
