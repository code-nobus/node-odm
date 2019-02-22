import {RepositoryFactory} from "./Repository";

export class Configuration {
    public readonly repositoryFactory: RepositoryFactory;

    constructor() {
        this.repositoryFactory = new RepositoryFactory();
    }
}
