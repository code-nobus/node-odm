import {Ctor} from "@sirian/ts-extra-types";
import {AbstractODMDocument} from "./Metadata";
import {ODMDocument} from "./Metadata/ODMDocument";

export class Reference<C extends Ctor<ODMDocument>> {
    protected docClass: C;
    protected id: any;

    public constructor(docClass: C, id: any) {
        this.docClass = docClass;
        this.id = id;

    }
}
