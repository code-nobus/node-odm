import {Annotations, FieldAnnotation, ODM} from "../../../../src";

function check(ctor: any, options: any) {
    const expected = new FieldAnnotation(ctor.prototype, "foo", options);

    expect(Annotations.get(FieldAnnotation, ctor, "foo")).toStrictEqual([expected]);
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
