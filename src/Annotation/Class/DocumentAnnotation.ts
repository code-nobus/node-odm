import {AbstractDocumentAnnotation} from "./AbstractDocumentAnnotation";

export interface IDocumentAnnotationOptions {
    collection?: string;
    db?: string;
}

export class DocumentAnnotation extends AbstractDocumentAnnotation<IDocumentAnnotationOptions> {

}
