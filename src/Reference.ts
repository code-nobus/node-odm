import {Ctor} from "@sirian/ts-extra-types";
import {AbstractDoc} from "./Schema";
import {Doc} from "./Schema/Doc";

export class Reference<C extends Ctor<Doc>> {
    protected docClass: C;
    protected id: any;

    public constructor(docClass: C, id: any) {
        this.docClass = docClass;
        this.id = id;

    }
}
