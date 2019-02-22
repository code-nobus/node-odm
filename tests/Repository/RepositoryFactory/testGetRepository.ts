import {DocumentManager, DocumentRepository, ODM, ODMDocument} from "../../../src";
import {Configuration} from "../../../src/Configuration";

describe("", () => {
    const config = new Configuration();
    const dm = new DocumentManager(config);
    const factory = config.repositoryFactory;

    test("#getRepository", () => {
        @ODM.document
        class Post extends ODMDocument {}

        const repo = factory.getRepository(dm, Post);
        const repo2 = factory.getRepository(dm, Post);
        expect(repo).toBeInstanceOf(DocumentRepository);
        expect(repo2).toBe(repo);
        expect(repo.docClass).toBe(Post);
    });

    test("#getRepository custom repository", () => {
        class UserRepository extends DocumentRepository<User> {
            public foo() {
                return "bar";
            }
        }

        @ODM.document({})
        class User extends ODMDocument {
            public getRepositoryClass() {
                return UserRepository;
            }
        }

        const repo = factory.getRepository(dm, User);
        const repo2 = factory.getRepository(dm, User);

        expect(repo).toBeInstanceOf(UserRepository);
        expect(repo2).toBe(repo);
        expect(repo.docClass).toBe(User);
        expect(repo.foo()).toBe("bar");
    });

    test("#getRepository different dm", () => {
        @ODM.document
        class Post extends ODMDocument {}

        const dm2 = new DocumentManager(config);

        const repo1 = factory.getRepository(dm, Post);
        const repo2 = factory.getRepository(dm2, Post);

        expect(repo1).toBeInstanceOf(DocumentRepository);
        expect(repo2).toBeInstanceOf(DocumentRepository);
        expect(repo1).not.toBe(repo2);
    });

});
