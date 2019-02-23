import {DocumentRepository, ICustomRepository, ODM} from "../../../src";

describe("", () => {
    const odm = new ODM();

    const factory = odm.repositoryFactory;

    test("#getRepository", async () => {
        @ODM.document
        class Post {}

        const dm = await odm.getManager();
        const repo = factory.getRepository(dm, Post);
        const repo2 = factory.getRepository(dm, Post);
        expect(repo).toBeInstanceOf(DocumentRepository);
        expect(repo2).toBe(repo);
        expect(repo.docClass).toBe(Post);
    });

    test("#getRepository custom repository", async () => {
        class UserRepository extends DocumentRepository<User> {
            public foo() {
                return "bar";
            }
        }

        @ODM.document({})
        class User implements ICustomRepository {
            public getRepositoryClass() {
                return UserRepository;
            }
        }

        const dm = await odm.getManager();

        const repo = factory.getRepository(dm, User);
        const repo2 = factory.getRepository(dm, User);

        expect(repo).toBeInstanceOf(UserRepository);
        expect(repo2).toBe(repo);
        expect(repo.docClass).toBe(User);
        expect(repo.foo()).toBe("bar");
    });

    test("#getRepository different dm", async () => {
        @ODM.document
        class Post {}

        const dm1 = await odm.getManager();
        const dm2 = await odm.getManager();

        const repo1 = factory.getRepository(dm1, Post);
        const repo2 = factory.getRepository(dm2, Post);

        expect(repo1).toBeInstanceOf(DocumentRepository);
        expect(repo2).toBeInstanceOf(DocumentRepository);
        expect(repo1).not.toBe(repo2);
    });

});
