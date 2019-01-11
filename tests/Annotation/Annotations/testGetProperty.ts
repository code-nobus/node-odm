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

    const fooMeta = Annotations.get(FieldAnnotation, Foo, "name");
    const barMeta = Annotations.get(FieldAnnotation, Bar, "name");

    const fooField = new FieldAnnotation(Foo.prototype, "name", {name: "foo", nullable: true});
    const barField = new FieldAnnotation(Bar.prototype, "name");

    expect(fooMeta).toStrictEqual([fooField]);
    expect(barMeta).toStrictEqual([fooField, barField]);
});
