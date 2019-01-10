import {Decorator} from "@sirian/decorators";
import {Document, Field} from "./Meta";

export const ODM = {
    document: Decorator.forClass(Document.decorate),
    field: Decorator.forProperty(Field.decorate),
};
