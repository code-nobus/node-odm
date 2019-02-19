import {Var} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {AbstractDocumentAnnotation, Annotations, DocumentAnnotation} from "../Annotation";
import {Metadata} from "./Metadata";

export class MetadataFactory {
    protected static map: WeakMap<Ctor, Metadata> = new WeakMap();

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
