import {ClassMetadata, Document, Field, ODM} from "../../../src";

test("", () => {
    @ODM.document
    class Foo {

    }

    @ODM.document
    class Bar extends Foo {
        @ODM.field
        protected name?: string;
    }

    const fooMeta = ClassMetadata.getMeta(Foo, Document);
    const barMeta = ClassMetadata.getMeta(Bar, Document);

    const fooDoc = new Document(Foo);
    const barDoc = new Document(Bar);

    expect(fooMeta).toStrictEqual([fooDoc]);
    expect(barMeta).toStrictEqual([fooDoc, barDoc]);
});
