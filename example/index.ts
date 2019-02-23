import {MongoClient} from "mongodb";
import {DocumentRepository, ICustomRepository, ODM, SessionFactory} from "../src";

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
class User implements ICustomRepository {
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

    const odm = new ODM({
        sessionFactory: new SessionFactory(client),
    });

    const dm = await odm.getManager();

    const repo = dm.getRepository(User);
    const users = repo.findActive().getIterator();
    for await(const user of users) {
        console.log(user);
    }

    await client.close();
})();
