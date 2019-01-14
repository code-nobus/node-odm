import {Ctor} from "@sirian/ts-extra-types";
import {QueryBuilder} from "./Query";
import {RepositoryRegistry} from "./Repository";

export class DocumentManager {
    public readonly repositoryFactory: RepositoryRegistry;

    constructor() {
        this.repositoryFactory = new RepositoryRegistry(this);
    }

    public createQueryBuilder<T>(documentClass: Ctor<T>) {
        return new QueryBuilder(this, documentClass);
    }

    public getRepository<T extends Ctor>(docClass: T) {
        return this.repositoryFactory.get(docClass);
    }

}
