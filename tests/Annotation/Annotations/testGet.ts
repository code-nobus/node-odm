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

    const foo = new DocumentAnnotation(Foo);
    const bar = new DocumentAnnotation(Bar, {collection: "bar"});

    expect(Annotations.get(DocumentAnnotation, Foo)).toStrictEqual([foo]);
    expect(Annotations.get(DocumentAnnotation, Bar)).toStrictEqual([foo, bar]);

});
