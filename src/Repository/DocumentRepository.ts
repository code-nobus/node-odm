import {Var} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {DocumentManager} from "../DocumentManager";
import {ODMDocOption} from "../ODM";

export type RepositoryType<T extends Ctor> = InstanceType<ODMDocOption<T, "repositoryClass", Ctor<DocumentRepository<T>>>>;

export class DocumentRepository<T> {
    public readonly dm: DocumentManager;

    public readonly documentClass: Ctor<T>;

    public constructor(manager: DocumentManager, documentClass: Ctor<T>) {
        this.dm = manager;
        this.documentClass = documentClass;
    }

    public get documentPersister() {
        return this.dm.getDocumentPersister(this.documentClass);
    }

    public createQueryBuilder() {
        return this.dm.createQueryBuilder(this.documentClass);
    }

    public createAggregationBuilder() {
        return this.dm.createAggregationBuilder(this.documentClass);
    }

    public find(id: any) {
        if (Var.isNullable(id)) {
            return;
        }

        return this.findOneBy({_id: id});
    }

    public findAll() {
        return this.findBy({});
    }

    public findBy(criteria: object, sort?: object, limit?: number, skip?: number) {
        return this.documentPersister.loadAll(criteria, sort, limit, skip);
    }

    public findOneBy(query: object) {
        return this.documentPersister.load(query);
    }

}
