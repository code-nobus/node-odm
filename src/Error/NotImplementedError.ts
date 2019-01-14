import {fmt} from "@sirian/format";
import {ODMError} from "./ODMError";

export class NotImplementedError<T> extends ODMError {
    constructor(obj: T, key: keyof T) {
        super(fmt`${obj.constructor.name}.${key} not implemented`);
    }
}
