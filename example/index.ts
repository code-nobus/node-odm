import {Document, DocumentManager, DocumentRepository, ODM} from "../src";

class UserRepository extends DocumentRepository {
    public findActive() {
        // todo
    }
}

@ODM.document({db: "test", collection: "users"})
class User extends Document {
    public static repositoryClass = UserRepository;

    @ODM.field({name: "bar", nullable: false})
    public foo: string = "";
}

(async () => {
    const dm = new DocumentManager();
    const coll = await dm.getCollection(User);
    const repo = dm.getRepository(User);
    console.assert("users" === coll.collectionName);
    console.assert(UserRepository === repo.constructor);
    console.log("count", await coll.countDocuments());

    await dm.close();
})();
