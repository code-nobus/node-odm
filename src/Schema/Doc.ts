import {DocumentRepository, RepositoryCtor} from "../Repository";
import {AbstractDoc} from "./AbstractDoc";

export class Doc extends AbstractDoc {
    public getRepositoryClass(): RepositoryCtor<any> {
        return DocumentRepository as any;
    }
}
