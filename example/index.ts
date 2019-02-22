import {MongoClient} from "mongodb";
import {Configuration, DocumentManager, DocumentRepository, ODM, ODMDocument} from "../src";

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
class User extends ODMDocument {
    @ODM.field
    public active: boolean = false;

    public getRepositoryClass() {
        return UserRepository;
    }
}

(async () => {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/test", {
        useNewUrlParser: true,
    });
    const config = new Configuration();
    const dm = new DocumentManager(config, client);

    const users = dm.getRepository(User).findActive().getIterator();
    for await(const user of users) {
        console.log(user);
    }

    await dm.close();
})();
