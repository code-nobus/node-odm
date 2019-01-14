import {BaseIterator} from "@sirian/iterator";
import {Cursor} from "mongodb";

export class CursorIterator<T> extends BaseIterator<T> {
    protected cursor: Cursor<T>;

    constructor(cursor: Cursor<T>) {
        super();
        this.cursor = cursor;
    }

    public async* [Symbol.asyncIterator]() {
        const cursor = this.cursor;
        let hasNext = await cursor.hasNext();
        if (!hasNext) {
            await cursor.close();
            return;
        }

        while (hasNext) {
            const item = await cursor.next();

            if (null === item) {
                await cursor.close();
                break;
            }

            hasNext = await cursor.hasNext();

            if (!hasNext) {
                await cursor.close();
            }

            yield item;
        }
    }

}
