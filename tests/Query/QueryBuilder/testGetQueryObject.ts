import {ODM} from "../../../src";
import {TestODM} from "../../TestODM";

test("", async () => {
    @ODM.document
    class Foo {
        @ODM.field
        public foo!: number;
    }

    const odm = new TestODM();

    const dm = await odm.getManager();
    const qb = dm
        .createQueryBuilder(Foo)
        .field("foo").gt(2).lt(3)
    ;

    expect(qb.getQueryObject()).toStrictEqual(({foo: {$gt: 2, $lt: 3}}));
});
