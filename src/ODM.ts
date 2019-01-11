import {Decorator} from "@sirian/decorators";
import {DocumentAnnotation, FieldAnnotation} from "./Annotation";

export type ODMDocOption<T, K extends keyof IDocumentConstructor["odm"], TDefault> =
    T extends IDocumentConstructor
    ? K extends keyof T["odm"]
      ? T["odm"][K]
      : TDefault
    : TDefault;

export interface IDocumentConstructor {
    odm: {
        repositoryClass: any;
    };
}

export const ODM = {
    document: Decorator.forClass(DocumentAnnotation.decorate),
    field: Decorator.forProperty(FieldAnnotation.decorate),
};
