import {MongoClient} from "mongodb";
import {Session} from "./Session";

export interface ISessionFactory {
    getSession(): Session;

    connect(): any;

    destroy(): any;
}

export interface ISessionFactoryInit {
    client?: MongoClient;
    defaultDb?: string;
}

export class SessionFactory implements ISessionFactory {
    public readonly client: MongoClient;
    public readonly defaultDb: string;

    public constructor(init: ISessionFactoryInit = {}) {
        this.client = init.client || new MongoClient("mongodb://127.0.0.1/test", {
            useNewUrlParser: true,
        });
        this.defaultDb = init.defaultDb || "test";
    }

    public getSession() {
        return new Session({
            client: this.client,
            defaultDb: this.defaultDb,
        });
    }

    public async connect() {
        return this.client.connect();
    }

    public async destroy() {
        return this.client.close();
    }
}
