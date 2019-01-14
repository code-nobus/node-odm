import {Var, XMap} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {DocumentManager} from "../DocumentManager";
import {IODMDocument} from "../ODM";
import {Metadata} from "../Schema/Metadata";
import {DocumentRepository, RepositoryType} from "./DocumentRepository";

export class RepositoryRegistry {
    protected readonly map: XMap<Ctor, DocumentRepository<any>>;
    protected readonly dm: DocumentManager;

    constructor(dm: DocumentManager) {
        this.dm = dm;
        this.map = new XMap((documentClass) => this.createRepository(documentClass));
    }

    public get<T extends Ctor>(docClass: T) {
        return this.map.ensure(docClass) as RepositoryType<T>;
    }

    protected createRepository(docClass: Ctor & Partial<IODMDocument>) {
        if (!Metadata.isDocument(docClass)) {
            throw new InvalidArgumentError(`${docClass} is not ODM.document`);
        }

        const odm = docClass.odm;

        if (Var.isObject(odm)) {
            const ctor = odm.repositoryClass;
            if (Var.isSubclassOf(ctor, DocumentRepository)) {
                return new ctor(this, docClass);
            }
            if (Var.isFunction(odm.repositoryFactory)) {
                return odm.repositoryFactory(this.dm, docClass);
            }
        }

        return new DocumentRepository(this.dm, docClass);
    }
}
