import {Annotations, FieldAnnotation, ODM} from "../../../src";

test("", () => {
    class Foo {
        @ODM.field({name: "foo", nullable: true})
        protected name?: string;
    }

    class Bar extends Foo {
        @ODM.field
        protected name?: string;
    }

    const fooAnnotation = new FieldAnnotation(Foo.prototype, "name", {name: "foo", nullable: true});
    const barAnnotation = new FieldAnnotation(Bar.prototype, "name");

    expect(Annotations.get(FieldAnnotation, Foo, "name")).toStrictEqual([fooAnnotation]);
    expect(Annotations.get(FieldAnnotation, Bar, "name")).toStrictEqual([fooAnnotation, barAnnotation]);
});
