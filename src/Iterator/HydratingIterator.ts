import {AbstractTransformIterator} from "@sirian/iterator";

export class HydratingIterator<T> extends AbstractTransformIterator<object, T> {
    protected transform(value: object) {
        // todo
        return value as any as T;
    }
}
