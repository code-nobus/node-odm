import {Annotations, DocumentAnnotation, ODM} from "../../../src";

test("", () => {
    @ODM.document
    class Foo {

    }

    @ODM.document
    class Bar extends Foo {
        @ODM.field
        protected name?: string;
    }

    const fooMeta = Annotations.get(DocumentAnnotation, Foo);
    const barMeta = Annotations.get(DocumentAnnotation, Bar);

    const fooDoc = new DocumentAnnotation(Foo);
    const barDoc = new DocumentAnnotation(Bar);
    expect(fooMeta).toStrictEqual([fooDoc]);
    expect(barMeta).toStrictEqual([fooDoc, barDoc]);

});
