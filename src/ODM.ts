import {Decorator} from "@sirian/decorators";
import {DocumentAnnotation, FieldAnnotation} from "./Annotation";

export const ODM = {
    document: Decorator.forClass(DocumentAnnotation.decorate),
    field: Decorator.forProperty(FieldAnnotation.decorate),
};
