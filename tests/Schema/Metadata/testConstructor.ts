import {Document, ODM} from "../../../src";
import {Metadata} from "../../../src/Schema";

test("", () => {
    @ODM.document
    class User extends Document {

    }

    const meta = Metadata.get(User);
});
