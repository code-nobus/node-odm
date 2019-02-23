import {MongoClient} from "mongodb";

export interface IConnectionInit {
    client: MongoClient;
    defaultDb: string;
}

export class Session {
    public readonly client: MongoClient;
    public readonly defaultDb: string;

    constructor(init: IConnectionInit) {
        this.client = init.client;
        this.defaultDb = init.defaultDb;
    }

    public getDatabase(name: string = this.defaultDb) {
        return this.client.db(name);
    }
}
