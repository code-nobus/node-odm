import {DocumentAnnotation, FieldAnnotation} from "./Annotation";

export class ODM {
    public static readonly document = DocumentAnnotation.createDecorator();
    public static readonly field = FieldAnnotation.createDecorator();

}
