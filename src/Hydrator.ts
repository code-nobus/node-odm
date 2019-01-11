import {Annotations} from "./Annotation";
import {DocumentManager} from "./DocumentManager";

export class Hydrator<T> {
    private dm: DocumentManager;
    private meta: Annotations<T>;

    constructor(dm: DocumentManager, meta: Annotations<T>) {
        this.dm = dm;
        this.meta = meta;
    }

    public hydrate(document: T, data: object) {
        // todo
    }
}
