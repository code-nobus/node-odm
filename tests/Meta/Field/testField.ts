import {ClassMetadata, Field, ODM} from "../../../src";

function check(ctor: any, options: any) {
    const classMetadata = ClassMetadata.get(ctor);
    const expected = new Field(ctor.prototype, "foo", options);

    expect(classMetadata.getPropertyMeta("foo", Field)).toStrictEqual([expected]);
}

test("", () => {
    class User {
        @ODM.field
        protected foo?: string;
    }

    check(User, {});
});

test("", () => {
    class User {
        @ODM.field()
        protected foo?: string;
    }

    check(User, {});
});

test("", () => {
    class User {
        @ODM.field({name: "bar", nullable: true})
        protected foo?: string;
    }

    check(User, {name: "bar", nullable: true});
});
