import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {MongoClient} from "mongodb";
import {Configuration} from "./Configuration";
import {MetadataFactory, ODMDocument} from "./Metadata";
import {QueryBuilder} from "./Query";
import {RepositoryType} from "./Repository";

export class DocumentManager<T extends ODMDocument = any> {
    protected configuration: Configuration;
    protected client: MongoClient;

    constructor(configuration?: Configuration, client?: MongoClient) {
        this.configuration = configuration || new Configuration();
        this.client = client || new MongoClient("mongodb://127.0.0.1:27017");
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

        return this.client.db(meta.dbName!);
    }

    public createQueryBuilder<C extends Ctor<T>>(docClass: C): QueryBuilder<InstanceType<C>> {
        return new QueryBuilder(this, docClass) as any;
    }

    public getRepository<C extends Ctor<T>>(docClass: C): RepositoryType<C> {
        return this.configuration.repositoryFactory.getRepository(this, docClass);
    }

    public async close() {
        if (!this.client) {
            return;
        }
        const client = await this.client;
        await client.close();
    }

    public clear(ctor: Ctor<T>): void {
    }

    public detach(object: T): void {
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
