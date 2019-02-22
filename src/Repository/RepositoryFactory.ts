import {Var} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {DocumentManager} from "../DocumentManager";
import {ODMDocument} from "../Metadata";
import {DocumentRepository, RepositoryType} from "./DocumentRepository";

export class RepositoryFactory {
    protected readonly map: WeakMap<DocumentManager, WeakMap<Ctor<ODMDocument>, DocumentRepository<any>>>;

    constructor() {
        this.map = new WeakMap();
    }

    public getRepository<C extends Ctor>(dm: DocumentManager, docClass: C) {
        const map = this.getDocumentManagerRepositories(dm);

        if (!map.has(docClass)) {
            const repo = this.createRepository(dm, docClass);
            map.set(docClass, repo);
        }

        return map.get(docClass)! as RepositoryType<C>;
    }

    protected getDocumentManagerRepositories(dm: DocumentManager) {
        const map = this.map;
        if (!map.has(dm)) {
            map.set(dm, new WeakMap());
        }
        return map.get(dm)!;
    }

    protected createRepository<C extends Ctor>(dm: DocumentManager<InstanceType<C>>, docClass: C) {
        const meta = dm.getMetadata(docClass);

        if (!meta.isDocument) {
            throw new InvalidArgumentError(`${docClass} is not ODM.document`);
        }

        const proto = docClass.prototype;

        const ctor = proto.getRepositoryClass();

        if (!Var.isSubclassOf(ctor, DocumentRepository)) {
            throw new InvalidArgumentError("getRepositoryClass() should return class extending DocumentRepository");
        }

        return new ctor(dm, docClass) as RepositoryType<C>;
    }
}
