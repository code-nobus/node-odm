import {MongoClient} from "mongodb";

export interface IConnectionInit {
    client: MongoClient;
}

export class Session {
    protected client: MongoClient;

    constructor(init: IConnectionInit) {
        this.client = init.client;
    }

    public getDatabase(name?: string) {
        return this.client.db(name);
    }
}
