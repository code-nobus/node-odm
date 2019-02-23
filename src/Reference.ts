import {Ctor} from "@sirian/ts-extra-types";

export class Reference<C extends Ctor> {
    protected docClass: C;
    protected id: any;

    public constructor(docClass: C, id: any) {
        this.docClass = docClass;
        this.id = id;
    }
}
