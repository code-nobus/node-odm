import {DocumentManager, IDocumentManagerInit} from "./DocumentManager";

export class ManagerFactory {
    public getManager(init: IDocumentManagerInit) {
        return new DocumentManager(init);
    }
}
