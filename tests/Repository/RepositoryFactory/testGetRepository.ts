import {Document, DocumentManager, DocumentRepository, ODM} from "../../../src";

describe("", () => {
    const dm = new DocumentManager();
    const factory = dm.repositoryFactory;

    test("#getRepository", () => {
        @ODM.document
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

        @ODM.document
        class User extends Document {
            public static repositoryClass = UserRepository;
        }

        const repo = dm.getRepository(User);

        expect(repo).toBeInstanceOf(UserRepository);
        expect(repo.documentClass).toBe(User);
        expect(repo.foo()).toBe("bar");
    });

});
