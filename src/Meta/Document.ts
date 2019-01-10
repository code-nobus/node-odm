import {Args} from "@sirian/ts-extra-types";
import {ClassMeta} from "./ClassMeta";
import {ClassMetadata} from "./ClassMetadata";

export interface IDocumentInit {
    collection: string;
}

export class Document extends ClassMeta {
    public readonly collection: string;

    constructor(ctor: Function, opts: Partial<IDocumentInit> = {}) {
        super(ctor);

        this.collection = opts.collection || ctor.name;
    }

    public static decorate([proto]: Args<ClassDecorator>, opts: Partial<IDocumentInit> = {}) {
        const meta = new Document(proto, opts);

        ClassMetadata.addMeta(meta);
    }
}
