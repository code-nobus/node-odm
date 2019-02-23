import {MongoClient} from "mongodb";
import {Session} from "./Session";

export interface ISessionFactory {
    getSession(): Promise<Session>;
}

export class SessionFactory implements ISessionFactory {
    protected clientPromise: Promise<MongoClient>;

    public constructor(client: Promise<MongoClient>) {
        this.clientPromise = client;
    }

    public async getSession() {
        const client = await this.clientPromise;

        return new Session({
            client,
        });
    }
}
