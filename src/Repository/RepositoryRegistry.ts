import {Var, XMap} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {DocumentManager} from "../DocumentManager";
import {IDocumentClass, Metadata} from "../Schema";
import {DocumentRepository, RepositoryType} from "./DocumentRepository";

export class RepositoryRegistry {
    protected readonly map: XMap<IDocumentClass, DocumentRepository<any>>;
    protected readonly dm: DocumentManager;

    constructor(dm: DocumentManager) {
        this.dm = dm;
        this.map = new XMap((documentClass) => this.createRepository(documentClass));
    }

    public get<D extends IDocumentClass>(docClass: D) {
        return this.map.ensure(docClass) as RepositoryType<D>;
    }

    protected createRepository<D extends IDocumentClass>(docClass: D) {
        const meta = Metadata.get(docClass);

        if (!meta.isDocument) {
            throw new InvalidArgumentError(`${docClass} is not ODM.document`);
        }

        const ctor = docClass.repositoryClass;

        if (ctor) {
            if (Var.isSubclassOf(ctor, DocumentRepository)) {
                return new ctor(this.dm, docClass);
            } else {
                throw new InvalidArgumentError("repositoryClass should extends DocumentRepository");
            }
        }

        const factory = docClass.repositoryFactory;

        if (factory) {
            if (Var.isFunction(factory)) {
                return factory(this.dm, docClass);
            } else {
                throw new InvalidArgumentError("repositoryFactory should be a function");
            }
        }

        return new DocumentRepository(this.dm, docClass);
    }
}
