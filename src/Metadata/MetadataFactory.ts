import {Var} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {AbstractDocumentAnnotation, AnnotationRegistry, DocumentAnnotation} from "../Annotation";
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

        this.loadDocMetadata(meta);

        return meta;
    }

    protected static loadDocMetadata(meta: Metadata) {
        const target = meta.class;

        const docAnnotations = AnnotationRegistry.get(AbstractDocumentAnnotation, target);

        if (docAnnotations.length > 1) {
            throw new Error();
        }

        const annotation = docAnnotations[0];

        if (Var.isInstanceOf(annotation, DocumentAnnotation)) {
            const o = annotation.opts;
            meta.isDocument = true;
            meta.dbName = o.db;
            meta.collectionName = o.collection || target.name;
        }
    }
}
