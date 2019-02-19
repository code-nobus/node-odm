import {Var, XMap} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {DocumentManager} from "../DocumentManager";
import {Doc, Metadata} from "../Schema";
import {DocumentRepository, RepositoryType} from "./DocumentRepository";

export class RepositoryFactory {
    protected readonly map: XMap<Ctor<Doc>, DocumentRepository<any>>;
    protected readonly dm: DocumentManager;

    constructor(dm: DocumentManager) {
        this.dm = dm;
        this.map = new XMap((docClass) => this.createRepository(docClass));
    }

    public get<C extends Ctor<Doc>>(docClass: C) {
        return this.map.ensure(docClass) as RepositoryType<C>;
    }

    protected createRepository<T extends Doc>(docClass: Ctor<T>) {
        const meta = Metadata.get(docClass);

        if (!meta.isDocument) {
            throw new InvalidArgumentError(`${docClass} is not ODM.document`);
        }

        const proto = docClass.prototype as T;

        const ctor = proto.getRepositoryClass();

        if (!Var.isSubclassOf(ctor, DocumentRepository)) {
            throw new InvalidArgumentError("getRepositoryClass() should return class extending DocumentRepository");
        }

        return new ctor(this.dm, docClass);
    }
}
