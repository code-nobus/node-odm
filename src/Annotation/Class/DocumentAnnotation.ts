import {Args} from "@sirian/ts-extra-types";
import {Annotations} from "../Annotations";
import {ClassAnnotation} from "./ClassAnnotation";

export interface IDocumentInit {
    collection: string;
}

export class DocumentAnnotation extends ClassAnnotation {
    public readonly collection: string;

    constructor(ctor: Function, opts: Partial<IDocumentInit> = {}) {
        super(ctor);

        this.collection = opts.collection || ctor.name;
    }

    public static decorate([proto]: Args<ClassDecorator>, opts: Partial<IDocumentInit> = {}) {
        const meta = new DocumentAnnotation(proto, opts);

        Annotations.add(meta);
    }
}
