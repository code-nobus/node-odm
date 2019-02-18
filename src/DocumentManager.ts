import {InvalidArgumentError} from "@sirian/error";
import {MongoClient, MongoClientOptions} from "mongodb";
import {QueryBuilder} from "./Query";
import {RepositoryRegistry} from "./Repository";
import {Document, IDocumentClass, Metadata} from "./Schema";

export interface IDocumentManagerOptions {
    url: string;
    options: MongoClientOptions;
}

export class DocumentManager {
    public readonly repositoryFactory: RepositoryRegistry;
    protected options: IDocumentManagerOptions;
    protected client?: Promise<MongoClient>;

    constructor(init: Partial<IDocumentManagerOptions> = {}) {
        this.repositoryFactory = new RepositoryRegistry(this);
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

    public async getCollection<T extends IDocumentClass>(docClass: T) {
        const db = await this.getDocumentDatabase(docClass);
        const meta = Metadata.get(docClass);
        return db.collection(meta.collectionName!);
    }

    public async getDocumentDatabase<T extends IDocumentClass>(docClass: T) {
        if (!Metadata.get(docClass).isDocument) {
            throw new InvalidArgumentError(`${docClass} is not ODM.document`);
        }

        const meta = Metadata.get(docClass);
        const client = await this.getClient();
        return client.db(meta.dbName!);
    }

    public createQueryBuilder<T extends Document>(docClass: IDocumentClass<T>) {
        return new QueryBuilder(this, docClass);
    }

    public getRepository<D extends IDocumentClass>(docClass: D) {
        return this.repositoryFactory.get(docClass);
    }

    public async close() {
        if (!this.client) {
            return;
        }
        const client = await this.client;
        await client.close();
    }
}
