import {Var} from "@sirian/common";
import {Annotations} from "../Annotation";
import {DocumentManager} from "../DocumentManager";

class DocumentRepository<T> {
    public readonly dm: DocumentManager;

    public readonly metadata: Annotations<T>;

    public constructor(manager: DocumentManager, metadata: Annotations<T>) {
        this.dm = manager;
        this.metadata = metadata;
    }

    public get target() {
        return this.metadata.target;
    }

    public get documentPersister() {
        return this.dm.getDocumentPersister(this.target);
    }

    public createQueryBuilder() {
        return this.dm.createQueryBuilder(this.target);
    }

    public createAggregationBuilder() {
        return this.dm.createAggregationBuilder(this.target);
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
