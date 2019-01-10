export abstract class Type<TMongo = any, TModel = any> {
    public abstract transformToMongo(value: TModel): TMongo;

    public abstract transformToModel(value: TMongo): TModel;
}
