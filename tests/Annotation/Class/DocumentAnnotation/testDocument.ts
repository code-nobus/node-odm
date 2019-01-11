import {Annotations, DocumentAnnotation, ODM} from "../../../../src";

function check(ctor: any, options: any) {
    const expected = new DocumentAnnotation(ctor, options);

    expect(Annotations.get(DocumentAnnotation, ctor)).toStrictEqual([expected]);
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
