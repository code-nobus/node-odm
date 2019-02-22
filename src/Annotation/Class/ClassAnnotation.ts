import {Decorator} from "@sirian/decorators";
import {Annotation, AnnotationOptions} from "../Annotation";
import {AnnotationRegistry} from "../AnnotationRegistry";

export type ClassAnnotationCtor<O = any> = new (target: Function, opts?: O) => ClassAnnotation<O>;

export class ClassAnnotation<O = any> extends Annotation<O> {
    public static createDecorator<C extends ClassAnnotationCtor>(this: C) {
        return Decorator.forClass((opts?: AnnotationOptions<InstanceType<C>>) => {
            return <F extends Function>(ctor: F) => {
                const annotation = new this(ctor, opts);
                AnnotationRegistry.add(annotation);
                return ctor;
            };
        });
    }
}
