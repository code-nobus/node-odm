import {BaseIterator} from "@sirian/iterator";

export class LazyIterator<T> extends BaseIterator<T> {
    protected callback: () => Promise<BaseIterator<T>>;

    constructor(callback: () => Promise<BaseIterator<T>>) {
        super();
        this.callback = callback;
    }

    public [Symbol.asyncIterator]() {
        let it: AsyncIterator<T> | undefined;

        return {
            next: async () => {
                if (!it) {
                    const iterator = await this.callback();
                    it = iterator[Symbol.asyncIterator]();
                }

                return it.next();
            },
        };
    }
}
