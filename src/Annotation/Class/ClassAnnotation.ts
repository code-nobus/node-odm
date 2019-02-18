import {Annotation} from "../Annotation";
import {Annotations} from "../Annotations";

export type ClassAnnotationCtor<O> = new (target: Function, opts?: O) => ClassAnnotation<O>;

export class ClassAnnotation<O = any> extends Annotation<O> {
    public static decorate<O>(this: ClassAnnotationCtor<O>, opts?: O) {
        return <F extends Function>(ctor: F) => {
            const meta = new this(ctor, opts);

            Annotations.add(meta);

            return ctor;
        };
    }
}
