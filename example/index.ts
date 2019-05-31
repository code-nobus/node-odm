import {ODM} from "../src";

@ODM.document({
    collection: "users",
})
class User {
    @ODM.field()
    public active: boolean = false;
}

(async () => {
    const odm = new ODM();

    await odm.connect();

    const dm = odm.getManager();

    const repo = dm.getRepository(User);

    const users = repo.findBy({active: true}).getIterator();

    for await(const user of users) {
        console.log(user);
    }

    await odm.destroy();
})();
