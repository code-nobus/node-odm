import {Doc, DocumentManager, DocumentRepository, ODM} from "../src";

class UserRepository extends DocumentRepository<User> {
    public findActive() {
        return this
            .createQueryBuilder()
            .field("active").eq(true)
            .getQuery();
    }
}

@ODM.document({
    collection: "users",
})
class User extends Doc {
    @ODM.field
    public active: boolean = false;

    public getRepositoryClass() {
        return UserRepository;
    }
}

(async () => {
    const dm = new DocumentManager({
        url: "mongodb://127.0.0.1:27017/test",
    });

    const repo = dm.getRepository(User);
    const users = await repo.findActive().getIterator();
    for await(const user of users) {
        console.log(user);
    }

    await dm.close();
})();
