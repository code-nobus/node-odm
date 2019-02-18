import {Document, IDocumentClass} from "./Schema";

export class Reference<T extends Document> {
    protected documentClass: IDocumentClass<T>;
    protected id: any;

    public constructor(documentClass: IDocumentClass<T>, id: any) {
        this.documentClass = documentClass;
        this.id = id;

    }
}
