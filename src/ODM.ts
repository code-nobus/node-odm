import {Decorator} from "@sirian/decorators";
import {Ctor} from "@sirian/ts-extra-types";
import {DocumentAnnotation, FieldAnnotation} from "./Annotation";
import {DocumentManager} from "./DocumentManager";
import {DocumentRepository} from "./Repository";

export type ODMDocOption<T, K extends keyof IODMDocument["odm"], TDefault> =
    T extends any
    ? K extends keyof T["odm"]
      ? T["odm"][K]
      : TDefault
    : TDefault;

export interface IODMDocument {
    odm: {
        repositoryClass: Ctor<DocumentRepository<any>>;
        repositoryFactory: <T extends Ctor>(dm: DocumentManager, documentClass: T) => DocumentRepository<T>
    };
}

export const ODM = {
    document: Decorator.forClass(DocumentAnnotation.decorate),
    field: Decorator.forProperty(FieldAnnotation.decorate),
};
