import {DocumentManager} from "./DocumentManager";

export class Hydrator<T> {
    private dm: DocumentManager;

    constructor(dm: DocumentManager) {
        this.dm = dm;
    }

    public hydrate(document: T, data: object) {
        // todo
    }
}
