import {Annotations} from "@sirian/annotations";
import {DocumentAnnotation, ODM} from "../../../../src";

function check(ctor: any, options: any) {
    const a = Annotations.getFirst(DocumentAnnotation, ctor)!;
    expect(a.options).toStrictEqual(options);
}

test("@ODM.document()", () => {
    @ODM.document()
    class User {
    }

    check(User, {});
});

test(`@ODM.document({collection: "users"})`, () => {
    @ODM.document({collection: "users"})
    class User {
    }

    check(User, {collection: "users"});
});
