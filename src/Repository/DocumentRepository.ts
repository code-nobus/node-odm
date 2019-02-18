import {Var} from "@sirian/common";
import {Ctor, Func} from "@sirian/ts-extra-types";
import {FindOneOptions} from "mongodb";
import {DocumentManager} from "../DocumentManager";
import {Document, IDocumentClass} from "../Schema";

export type RepositoryFactory<T> = (dm: DocumentManager, docClass: Ctor<T>) => DocumentRepository<T>;
export type RepositoryCtor<T> = new(dm: DocumentManager, docClass: Ctor<T>) => DocumentRepository<T>;

export type RepositoryType<D extends IDocumentClass> =
    D extends { repositoryClass: Ctor<infer R1> } ? R1 :
    D extends { repositoryFactory: Func<infer R2> } ? R2 :
    DocumentRepository<InstanceType<D>>;

export class DocumentRepository<T extends Document = any> {
    public readonly dm: DocumentManager;

    public readonly documentClass: IDocumentClass<T>;

    public constructor(manager: DocumentManager, documentClass: IDocumentClass<T>) {
        this.dm = manager;
        this.documentClass = documentClass;
    }

    public createQueryBuilder() {
        return this.dm.createQueryBuilder(this.documentClass);
    }

    public find(id: any) {
        if (Var.isNullable(id)) {
            return;
        }

        return this.findOneBy({_id: id});
    }

    public findAll() {
        return this.findBy({}).toArray();
    }

    public findBy(query: object, options: Partial<FindOneOptions> = {}) {
        return this.createQueryBuilder()
            .setQueryObject(query)
            .setOptions(options)
            .getQuery();
    }

    public findOneBy(query: object) {
        return this.findBy(query).getSingleResult();
    }

}
