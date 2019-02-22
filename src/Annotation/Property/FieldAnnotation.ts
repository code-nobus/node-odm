import {Ctor} from "@sirian/ts-extra-types";
import * as BSON from "bson";
import {Type} from "../../Type";
import {PropertyAnnotation} from "./PropertyAnnotation";

export type FieldType =
    typeof String |
    typeof Number |
    typeof Boolean |
    typeof Date |
    typeof RegExp |
    typeof Array |
    typeof BSON.Binary |
    typeof BSON.Code |
    typeof BSON.DBRef |
    typeof BSON.Double |
    typeof BSON.Int32 |
    typeof BSON.Long |
    typeof BSON.MinKey |
    typeof BSON.MaxKey |
    typeof BSON.ObjectId |
    typeof BSON.Timestamp |
    typeof BSON.BSONRegExp |
    typeof BSON.Decimal128 |
    Ctor<Type>;

export interface IFieldAnnotationOptions {
    name?: string;
    type?: FieldType;
    nullable?: boolean;
}

export class FieldAnnotation extends PropertyAnnotation<IFieldAnnotationOptions> {

}
