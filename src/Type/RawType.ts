import {Type} from "./Type";

export class RawType extends Type<any, any> {
    public transformToModel(value: any) {
        return value;
    }

    public transformToMongo(value: any) {
        return value;
    }

}
