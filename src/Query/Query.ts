import {Ctor} from "@sirian/ts-extra-types";
import {Cursor} from "mongodb";
import {DocumentManager} from "../DocumentManager";
import {NotImplementedError} from "../Error";
import {CursorIterator} from "../Iterator";

export class Query<T> {
    protected dm: DocumentManager;
    protected documentClass: Ctor<T>;

    constructor(dm: DocumentManager, documentClass: Ctor<T>) {
        this.dm = dm;
        this.documentClass = documentClass;
    }

    public toArray() {
        return this.getIterator().toArray();
    }

    public async getSingleResult() {
        const cursor = this.getCursor().limit(1);

        try {
            return await cursor.next();
        } finally {
            await cursor.close();
        }
    }

    public getIterator() {
        return new CursorIterator(this.getCursor());
    }

    public getCursor(): Cursor<object> {
        // todo
        throw new NotImplementedError(this, "getCursor");
    }
}
