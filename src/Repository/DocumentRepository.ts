import {Var} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {FindOneOptions} from "mongodb";
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
            .setQuery(query)
            .setOptions(options)
            .getQuery();
    }

    public findOneBy(query: object) {
        return this.findBy(query).getSingleResult();
    }

}
