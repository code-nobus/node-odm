import {DocumentRepository, RepositoryCtor} from "../Repository";
import {AbstractODMDocument} from "./AbstractODMDocument";

export class ODMDocument extends AbstractODMDocument {
    public getRepositoryClass(): RepositoryCtor<any> {
        return DocumentRepository as any;
    }
}
