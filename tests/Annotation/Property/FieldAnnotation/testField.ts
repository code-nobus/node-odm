import {Annotations, FieldAnnotation, ODM} from "../../../../src";

function check(ctor: any, options: any) {
    const expected = new FieldAnnotation(ctor.prototype, "foo", options);

    expect(Annotations.getPropertyAnnotations(FieldAnnotation, ctor, "foo")).toStrictEqual([expected]);
}

test("@ODM.field", () => {
    class User {
        @ODM.field
        protected foo?: string;
    }

    check(User, {});
});

test("@ODM.field()", () => {
    class User {
        @ODM.field()
        protected foo?: string;
    }

    check(User, {});
});

test(`@ODM.field({name: "bar", nullable: true})`, () => {
    class User {
        @ODM.field({name: "bar", nullable: true})
        protected foo?: string;
    }

    check(User, {name: "bar", nullable: true});
});
