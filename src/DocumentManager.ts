import {Var, XMap} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {DocumentRepository, RepositoryType} from "./Repository";

export class DocumentManager {
    protected readonly repositories: XMap<object, DocumentRepository<any>>;

    constructor() {
        this.repositories = new XMap((target) => this.createRepository(target));
    }

    public getDocumentPersister<T>(target: T): any {
        // todo
    }

    public createQueryBuilder<T>(target: T): any {
        // todo
    }

    public createAggregationBuilder<T>(target: T): any {
        // todo
    }

    public getRepository<T extends Ctor>(documentClass: T) {
        return this.repositories.ensure(documentClass) as RepositoryType<T>;
    }

    protected createRepository(documentClass: any) {
        // todo: check if documentClass has DocumentAnnotation
        if (!Var.isFunction(documentClass)) {
            throw new InvalidArgumentError();
        }

        const odm = documentClass.odm;
        if (Var.isObject(odm)) {
            const ctor = odm.repositoryClass;
            if (Var.isSubclassOf(ctor, DocumentRepository)) {
                return new ctor(this, documentClass);
            }
        }

        return new DocumentRepository(this, documentClass);
    }
}
