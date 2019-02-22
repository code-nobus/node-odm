import {Decorator} from "@sirian/decorators";
import {Annotation, AnnotationOptions} from "../Annotation";
import {AnnotationRegistry} from "../AnnotationRegistry";

export type PropertyAnnotationCtor<O = any> = new(object: object, k: PropertyKey, opts?: O) => PropertyAnnotation<O>;

export class PropertyAnnotation<O = any> extends Annotation<O> {
    public readonly proto: object;
    public readonly propertyKey: PropertyKey;

    constructor(proto: object, propertyKey: PropertyKey, opts?: O) {
        super(proto.constructor, opts);

        this.proto = proto;
        this.propertyKey = propertyKey;
    }

    public static createDecorator<C extends PropertyAnnotationCtor>(this: C) {
        return Decorator.forProperty((opts?: AnnotationOptions<InstanceType<C>>) => {
            return (proto: object, propertyKey: PropertyKey) => {
                const annotation = new this(proto, propertyKey, opts);
                AnnotationRegistry.add(annotation);
            };
        });
    }
}
