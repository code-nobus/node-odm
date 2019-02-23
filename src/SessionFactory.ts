import {MongoClient} from "mongodb";
import {Session} from "./Session";

export interface ISessionFactory {
    getSession(): Promise<Session>;
}

export class SessionFactory implements ISessionFactory {
    protected client: MongoClient;

    public constructor(client?: MongoClient) {
        this.client = client || new MongoClient("mongodb://127.0.0.1", {
            useNewUrlParser: true,
        });
    }

    public async getSession() {
        return new Session({
            client: this.client,
        });
    }
}
