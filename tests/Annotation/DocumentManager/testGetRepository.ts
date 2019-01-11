import {DocumentManager, DocumentRepository} from "../../../src";

test("#getRepository", () => {
    const dm = new DocumentManager();
    class Post {}

    const repo = dm.getRepository(Post);
    expect(repo).toBeInstanceOf(DocumentRepository);
    expect(repo.documentClass).toBe(Post);
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

    const dm = new DocumentManager();
    const repo = dm.getRepository(User);

    expect(repo).toBeInstanceOf(UserRepository);
    expect(repo.documentClass).toBe(User);
    expect(repo.foo()).toBe("bar");
});
