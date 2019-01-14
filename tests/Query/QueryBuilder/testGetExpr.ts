import {DocumentManager, ODM} from "../../../src";

test("", () => {
    @ODM.document
    class Foo {
        @ODM.field
        public foo!: number;
    }

    const dm = new DocumentManager();
    const qb = dm
        .createQueryBuilder(Foo)
        .field("foo").gt(2).lt(3)
    ;

    expect(qb.getExpr()).toStrictEqual(({foo: {$gt: 2, $lt: 3}}));
});
