import {ODM} from "../../../src";
import {Metadata} from "../../../src/Schema/Metadata";

test("", () => {
    @ODM.document
    class User {

    }

    const meta = Metadata.get(User);
});
