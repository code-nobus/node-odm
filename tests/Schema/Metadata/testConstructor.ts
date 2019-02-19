import {AbstractDoc, ODM} from "../../../src";
import {Metadata} from "../../../src/Schema";

test("", () => {
    @ODM.document
    class User extends AbstractDoc {

    }

    const meta = Metadata.get(User);
});
