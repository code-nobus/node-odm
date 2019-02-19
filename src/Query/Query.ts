import {Ctor} from "@sirian/ts-extra-types";
import {DocumentManager} from "../DocumentManager";
import {CursorIterator, LazyIterator} from "../Iterator";
import {QueryObject, QueryOptions} from "./QueryBuilder";

export interface IQueryInit<T> {
    dm: DocumentManager;
    docClass: Ctor<T>;
    queryObject?: QueryObject<T>;
    options?: QueryOptions;
}

export class Query<T> {
    public readonly dm: DocumentManager;
    public readonly docClass: Ctor<T>;
    public readonly queryObject: QueryObject<T>;
    public readonly options: QueryOptions;

    constructor(init: IQueryInit<T>) {
        this.dm = init.dm;
        this.docClass = init.docClass;
        this.queryObject = {...init.queryObject};
        this.options = {...init.options};
    }

    public async getCollection() {
        return this.dm.getCollection(this.docClass);
    }

    public toArray() {
        return this.getIterator().toArray();
    }

    public async getSingleResult() {
        const cursor = await this.createCursor();

        cursor.limit(1);

        try {
            return await cursor.next();
        } finally {
            await cursor.close();
        }
    }

    public getIterator() {
        return new LazyIterator(async () => this.createCursorIterator());
    }

    public async createCursor() {
        const collection = await this.getCollection();
        return collection.find(this.queryObject, this.options);
    }

    protected async createCursorIterator() {
        const cursor = await this.createCursor();
        return new CursorIterator(cursor);
    }
}
