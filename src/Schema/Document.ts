import {Ctor} from "@sirian/ts-extra-types";
import {DocumentManager} from "../DocumentManager";
import {DocumentRepository, RepositoryCtor, RepositoryFactory} from "../Repository";

export interface IDocumentClass<T extends Document = any> {
    repositoryClass?: RepositoryCtor<T>;
    repositoryFactory?: RepositoryFactory<T>;

    new(...args: any[]): T;
}

export class Document {
    public static repositoryClass?: Ctor<DocumentRepository>;
    public static repositoryFactory?: (dm: DocumentManager, docClass: IDocumentClass) => DocumentRepository;
}
