import {ClassMetadata, Document, ODM} from "../../../src";

function check(ctor: any, options: any) {
    const classMetadata = ClassMetadata.get(ctor);
    const expected = new Document(ctor, options);

    expect(classMetadata.getMeta(Document)).toStrictEqual([expected]);
}

test("", () => {
    @ODM.document
    class User {
    }

    check(User, {});
});

test("", () => {
    @ODM.document()
    class User {
    }

    check(User, {});
});

test("", () => {
    @ODM.document({collection: "users"})
    class User {
    }

    check(User, {collection: "users"});
});
