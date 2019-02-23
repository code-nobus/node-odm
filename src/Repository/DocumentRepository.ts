import {Var} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {FindOneOptions} from "mongodb";
import {DocumentManager} from "../DocumentManager";

export class DocumentRepository<T = any> {
    public readonly dm: DocumentManager;

    public readonly docClass: Ctor<T>;

    public constructor(manager: DocumentManager, docClass: Ctor<T>) {
        this.dm = manager;
        this.docClass = docClass;
    }

    public createQueryBuilder() {
        return this.dm.createQueryBuilder(this.docClass);
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
