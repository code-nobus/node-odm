import {IAnnotationContext} from "@sirian/annotations";
import {AbstractDocumentAnnotation} from "./AbstractDocumentAnnotation";

export interface IDocumentAnnotationOptions {
    collection?: string;
    db?: string;
}

export class DocumentAnnotation extends AbstractDocumentAnnotation {
    public readonly options: IDocumentAnnotationOptions;

    constructor(ctx: IAnnotationContext, options: IDocumentAnnotationOptions = {}) {
        super(ctx);
        this.options = options;
    }
}
