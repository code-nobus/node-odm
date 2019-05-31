import {Var} from "@sirian/common";
import {InvalidArgumentError} from "@sirian/error";
import {Ctor} from "@sirian/ts-extra-types";
import {DocumentManager} from "../DocumentManager";
import {DocumentRepository} from "./DocumentRepository";

export type RepositoryCtor = Ctor<DocumentRepository, [DocumentManager, Ctor]>;

export interface ICustomRepository {
    getRepositoryClass(): RepositoryCtor;
}

export type RepositoryType<T extends any> =
    T extends ICustomRepository
    ? InstanceType<ReturnType<T["getRepositoryClass"]>>
    : DocumentRepository<T>;

export class RepositoryFactory {
    protected readonly map: WeakMap<DocumentManager, WeakMap<Ctor, DocumentRepository>>;

    constructor() {
        this.map = new WeakMap();
    }

    public getRepository<C extends Ctor>(dm: DocumentManager, docClass: C) {
        const map = this.getDocumentManagerRepositories(dm);

        if (!map.has(docClass)) {
            const repo = this.createRepository(dm, docClass);
            map.set(docClass, repo);
        }

        return map.get(docClass)! as RepositoryType<InstanceType<C>>;
    }

    protected getDocumentManagerRepositories(dm: DocumentManager) {
        const map = this.map;
        if (!map.has(dm)) {
            map.set(dm, new WeakMap());
        }
        return map.get(dm)!;
    }

    protected createRepository<T extends Partial<ICustomRepository>>(dm: DocumentManager<T>, docClass: Ctor<T>) {
        const meta = dm.getMetadata(docClass);

        if (!meta.isDocument) {
            throw new InvalidArgumentError(`${docClass} is not ODM.document`);
        }

        const proto = docClass.prototype as T;

        if (Var.isFunction(proto.getRepositoryClass)) {
            const ctor = proto.getRepositoryClass();

            if (!Var.isSubclassOf(ctor, DocumentRepository)) {
                throw new InvalidArgumentError("getRepositoryClass() should return class extending DocumentRepository");
            }

            return new ctor(dm, docClass);
        }

        return new DocumentRepository(dm, docClass);
    }
}
