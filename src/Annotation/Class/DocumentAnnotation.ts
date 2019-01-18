import {Args, Ctor} from "@sirian/ts-extra-types";
import {Annotations} from "../Annotations";
import {ClassAnnotation} from "./ClassAnnotation";

export interface IDocumentInit {
    collection: string;
    db: string;
}

export class DocumentAnnotation<C extends Ctor = Ctor> extends ClassAnnotation<C> {
    public readonly collection: string;

    constructor(ctor: C, opts: Partial<IDocumentInit> = {}) {
        super(ctor);

        this.collection = opts.collection || ctor.name;
    }

    public static decorate([proto]: Args<ClassDecorator>, opts: Partial<IDocumentInit> = {}) {
        const meta = new DocumentAnnotation(proto as Ctor, opts);

        Annotations.add(meta);
    }
}
