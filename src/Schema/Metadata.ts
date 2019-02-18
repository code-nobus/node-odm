import {Obj, Var} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {Annotations, DocumentAnnotation} from "../Annotation";
import {AbstractDocumentAnnotation} from "../Annotation/Class/AbstractDocumentAnnotation";

export class Metadata<C extends Ctor = Ctor> {
    protected static map: WeakMap<Ctor, Metadata> = new WeakMap();

    public collectionName?: string;
    public dbName?: string;
    public isDocument?: boolean;

    constructor(ctor: C) {
        if (!Var.isFunction(ctor)) {
            throw new InvalidArgumentError(`${ctor} is not a function`);
        }

        this.collectionName = ctor.name;
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
            meta.set({
                isDocument: true,
                dbName: o.db,
                collectionName: o.collection,
            });
        }

        return meta;
    }

    public set(data: Partial<Metadata>) {
        for (const [key, value] of Obj.entries(data)) {
            if (undefined !== value) {
                this[key] = value;
            }
        }
    }
}
