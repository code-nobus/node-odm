import {Obj, Var} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {AbstractDocumentAnnotation, Annotations, DocumentAnnotation} from "../Annotation";

export class Metadata<C extends Ctor = any> {
    protected static map: WeakMap<Ctor, Metadata> = new WeakMap();

    public collectionName?: string;
    public dbName?: string;
    public isDocument: boolean;
    public readonly class: C;

    constructor(ctor: C) {
        if (!Var.isFunction(ctor)) {
            throw new InvalidArgumentError(`${ctor} is not a function`);
        }
        this.class = ctor;

        this.isDocument = false;
    }

    public static has(c: Ctor) {
        return this.map.has(c);
    }

    public static get<C extends Ctor>(c: C) {
        const map = this.map;

        if (!map.has(c)) {
            const meta = this.loadMetadata(c);
            map.set(c, meta);
        }

        return map.get(c)! as Metadata<C>;
    }

    public static loadMetadata<C extends Ctor>(target: C) {
        const meta = new Metadata(target);

        const docAnnotations = Annotations.getAnnotations(AbstractDocumentAnnotation, target);

        if (docAnnotations.length > 1) {
            throw new Error();
        }

        const docAnnot = docAnnotations[0];

        if (Var.isInstanceOf(docAnnot, DocumentAnnotation)) {
            const o = docAnnot.opts;
            meta.isDocument = true;
            meta.dbName = o.db;
            meta.collectionName = o.collection || target.name;
        }

        return meta;
    }
}
