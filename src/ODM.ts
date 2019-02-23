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
    public static readonly document = DocumentAnnotation.createDecorator();
    public static readonly field = FieldAnnotation.createDecorator();

    public readonly managerFactory: ManagerFactory;
    public readonly sessionFactory: ISessionFactory;
    public readonly repositoryFactory: RepositoryFactory;

    constructor(init: IODMInit = {}) {
        this.sessionFactory = init.sessionFactory || new SessionFactory();
        this.managerFactory = init.managerFactory || new ManagerFactory();
        this.repositoryFactory = init.repositoryFactory || new RepositoryFactory();
    }

    public async getManager() {
        const session = await this.sessionFactory.getSession();

        return this.managerFactory.getManager({
            session,
            repositoryFactory: this.repositoryFactory,
        });
    }
}
