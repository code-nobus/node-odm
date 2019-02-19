import {Doc, DocumentManager, DocumentRepository, ODM} from "../../../src";

describe("", () => {
    const dm = new DocumentManager();
    const factory = dm.repositoryFactory;

    test("#getRepository", () => {
        @ODM.document
        class Post extends Doc {
        }

        const repo = factory.get(Post);
        expect(repo).toBeInstanceOf(DocumentRepository);
        expect(repo.docClass).toBe(Post);
        expect(dm.getRepository(Post)).toBe(repo);
    });

    test("#getRepository custom repository", () => {
        class UserRepository extends DocumentRepository<User> {
            public foo() {
                return "bar";
            }
        }

        @ODM.document({})
        class User extends Doc {
            public getRepositoryClass() {
                return UserRepository;
            }
        }

        const repo = dm.getRepository(User);

        expect(repo).toBeInstanceOf(UserRepository);
        expect(repo.docClass).toBe(User);
        expect(repo.foo()).toBe("bar");
    });

});
