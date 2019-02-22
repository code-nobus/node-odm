import {AnnotationRegistry} from "./Annotation";
import {DocumentManager} from "./DocumentManager";

export class Hydrator<T> {
    private dm: DocumentManager;
    private meta: AnnotationRegistry<T>;

    constructor(dm: DocumentManager, meta: AnnotationRegistry<T>) {
        this.dm = dm;
        this.meta = meta;
    }

    public hydrate(document: T, data: object) {
        // todo
    }
}
