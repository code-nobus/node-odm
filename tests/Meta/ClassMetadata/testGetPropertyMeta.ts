import {ClassMetadata, Field, ODM} from "../../../src";

test("", () => {
    class Foo {
        @ODM.field({name: "foo", nullable: true})
        protected name?: string;
    }

    class Bar extends Foo {
        @ODM.field
        protected name?: string;
    }

    const fooMeta = ClassMetadata.getPropertyMeta(Foo, "name", Field);
    const barMeta = ClassMetadata.getPropertyMeta(Bar, "name", Field);

    const fooField = new Field(Foo.prototype, "name", {name: "foo", nullable: true});
    const barField = new Field(Bar.prototype, "name");

    expect(fooMeta).toStrictEqual([fooField]);
    expect(barMeta).toStrictEqual([fooField, barField]);
});
