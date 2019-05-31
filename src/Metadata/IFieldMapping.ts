import {Collection} from "../Collection/Collection";
import {Type} from "../Type";

export const enum ReferenceStoreType {
    ID = "id",
    DB_REF = "dbRef",
    DB_REF_WITH_DB = "dbRefWithDb",
    REF = "ref",
}

export interface IFieldMapping {
    fieldName: string;
    collectionClass?: { prototype: Collection };
    type: { prototype: Type };
    isCascadeRemove: boolean;
    isCascadePersist: boolean;
    isCascadeRefresh: boolean;
    isCascadeMerge: boolean;
    isCascadeDetach: boolean;
    storeAs: ReferenceStoreType;
}
