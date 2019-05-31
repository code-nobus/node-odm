import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {MetadataFactory} from "./Metadata";
import {QueryBuilder} from "./Query";
import {ICustomRepository, RepositoryFactory, RepositoryType} from "./Repository";
import {Session} from "./Session";

export interface IDocumentManagerInit {
    repositoryFactory: RepositoryFactory;
    session: Session;
}

export class DocumentManager<T extends ICustomRepository = ICustomRepository> {
    protected repositoryFactory: RepositoryFactory;
    protected session: Session;

    constructor(init: IDocumentManagerInit) {
        this.repositoryFactory = init.repositoryFactory;
        this.session = init.session;
    }

    public getCollection<C extends Ctor<T>>(docClass: C) {
        const db = this.getDocumentDatabase(docClass);
        const meta = this.getMetadata(docClass);
        const name = meta.collectionName;
        if (!name) {
            throw new Error(""); // todo
        }
        return db.collection(name);
    }

    public getDocumentDatabase<C extends Ctor<T>>(docClass: C) {
        const meta = this.getMetadata(docClass);

        if (!meta.isDocument) {
            throw new InvalidArgumentError(`${docClass} is not ODM.document`);
        }

        return this.session.getDatabase(meta.dbName);
    }

    public createQueryBuilder<C extends Ctor<T>>(docClass: C): QueryBuilder<InstanceType<C>> {
        return new QueryBuilder(this, docClass) as any;
    }

    public getRepository<C extends Ctor<T>>(docClass: C): RepositoryType<InstanceType<C>> {
        return this.repositoryFactory.getRepository(this, docClass);
    }

    public clear<C extends Ctor<T>>(ctor: C) {
    }

    public detach(object: T) {
    }

    public async flush() {
        throw new Error("not implemented"); // todo
    }

    public getMetadata<C extends Ctor<T>>(ctor: C) {
        return MetadataFactory.get(ctor);
    }

    public async initializeObject(object: T): Promise<T> {
        throw new Error("not implemented"); // todo
    }

    public isManaged(object: T): boolean {
        throw new Error("not implemented"); // todo
    }

    public merge(object: T): T {
        throw new Error("not implemented"); // todo
    }

    public persist(object: T) {
        throw new Error("not implemented"); // todo
    }

    public refresh(object: T): Promise<void> {
        throw new Error("not implemented"); // todo
    }

    public remove(object: T) {
        throw new Error("not implemented"); // todo
    }
}
