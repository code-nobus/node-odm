import {Annotations, DocumentAnnotation, ODM} from "../../../src";

test("", () => {
    @ODM.document
    class Foo {

    }

    @ODM.document({collection: "bar"})
    class Bar extends Foo {
        @ODM.field
        protected name?: string;
    }

    const fooDoc = new DocumentAnnotation(Foo);
    const barDoc = new DocumentAnnotation(Bar, {collection: "bar"});

    expect(Annotations.get(DocumentAnnotation, Foo)).toStrictEqual([fooDoc]);
    expect(Annotations.get(DocumentAnnotation, Bar)).toStrictEqual([fooDoc, barDoc]);

});
