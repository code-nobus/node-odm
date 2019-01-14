import {DocumentManager, DocumentRepository} from "../../../src";

describe("", () => {
    const dm = new DocumentManager();
    const factory = dm.repositoryFactory;

    test("#getRepository", () => {
        class Post {
        }

        const repo = factory.get(Post);
        expect(repo).toBeInstanceOf(DocumentRepository);
        expect(repo.documentClass).toBe(Post);
        expect(dm.getRepository(Post)).toBe(repo);
    });

    test("#getRepository custom repository", () => {
        class UserRepository extends DocumentRepository<User> {
            public foo() {
                return "bar";
            }
        }

        class User {
            public static readonly odm = {
                repositoryClass: UserRepository,
            };
        }

        const repo = dm.getRepository(User);

        expect(repo).toBeInstanceOf(UserRepository);
        expect(repo.documentClass).toBe(User);
        expect(repo.foo()).toBe("bar");
    });

});
