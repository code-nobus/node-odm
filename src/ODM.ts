import {DocumentAnnotation, FieldAnnotation} from "./Annotation";
import {ManagerFactory} from "./ManagerFactory";
import {RepositoryFactory} from "./Repository";
import {ISessionFactory, SessionFactory} from "./SessionFactory";

export interface IODMInit {
    sessionFactory?: ISessionFactory;
    managerFactory?: ManagerFactory;
    repositoryFactory?: RepositoryFactory;
}

export class ODM {
    public static readonly document = DocumentAnnotation.getDecorator();
    public static readonly field = FieldAnnotation.getDecorator();

    public readonly managerFactory: ManagerFactory;
    public readonly sessionFactory: ISessionFactory;
    public readonly repositoryFactory: RepositoryFactory;

    constructor(init: IODMInit = {}) {
        this.sessionFactory = init.sessionFactory || new SessionFactory();
        this.managerFactory = init.managerFactory || new ManagerFactory();
        this.repositoryFactory = init.repositoryFactory || new RepositoryFactory();
    }

    public getManager() {
        const session = this.sessionFactory.getSession();

        return this.managerFactory.getManager({
            session,
            repositoryFactory: this.repositoryFactory,
        });
    }

    public async connect() {
        await this.sessionFactory.connect();
    }

    public async destroy() {
        await this.sessionFactory.destroy();
    }
}
