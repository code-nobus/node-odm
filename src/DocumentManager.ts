import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {MongoClient, MongoClientOptions} from "mongodb";
import {QueryBuilder} from "./Query";
import {RepositoryFactory} from "./Repository";
import {Doc, Metadata} from "./Schema";

export interface IDocumentManagerOptions {
    url: string;
    options: MongoClientOptions;
}

export class DocumentManager<T extends Doc = any> {
    public readonly repositoryFactory: RepositoryFactory;
    protected options: IDocumentManagerOptions;
    protected client?: Promise<MongoClient>;

    constructor(init: Partial<IDocumentManagerOptions> = {}) {
        this.repositoryFactory = new RepositoryFactory(this);
        this.options = {
            url: "mongodb://127.0.0.1:27017",
            options: {
                useNewUrlParser: true,
            },
            ...init,
        };
    }

    public async getClient() {
        if (!this.client) {
            this.client = MongoClient.connect(this.options.url, this.options.options);
        }
        return this.client;
    }

    public async getCollection<C extends Ctor<T>>(docClass: C) {
        const db = await this.getDocumentDatabase(docClass);
        const meta = Metadata.get(docClass);
        const name = meta.collectionName;
        if (!name) {
            throw new Error(""); // todo
        }
        return db.collection(name);
    }

    public async getDocumentDatabase<C extends Ctor<T>>(docClass: C) {
        if (!Metadata.get(docClass).isDocument) {
            throw new InvalidArgumentError(`${docClass} is not ODM.document`);
        }

        const meta = Metadata.get(docClass);
        const client = await this.getClient();
        return client.db(meta.dbName!);
    }

    public createQueryBuilder<C extends Ctor<T>>(docClass: C): QueryBuilder<InstanceType<C>> {
        return new QueryBuilder(this, docClass) as any;
    }

    public getRepository<C extends Ctor<T>>(docClass: C) {
        return this.repositoryFactory.get(docClass);
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
        return Metadata.get(ctor);
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
