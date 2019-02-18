import {Decorator} from "@sirian/decorators";
import {DocumentAnnotation, FieldAnnotation, IDocumentAnnotationOptions, IFieldAnnotationOptions} from "./Annotation";

export const ODM = {
    document: Decorator.forClass((opts?: IDocumentAnnotationOptions) => DocumentAnnotation.decorate(opts)),
    field: Decorator.forProperty((opts?: IFieldAnnotationOptions) => FieldAnnotation.decorate(opts)),
};
