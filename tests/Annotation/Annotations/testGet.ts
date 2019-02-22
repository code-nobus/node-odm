import {AnnotationRegistry, DocumentAnnotation, FieldAnnotation, ODM} from "../../../src";

describe("", () => {
    @ODM.document
    class Foo {
        @ODM.field({nullable: true})
        protected foo?: string;
    }

    test("", () => {
        const a = AnnotationRegistry.get(DocumentAnnotation, Foo);
        expect(a).toStrictEqual([new DocumentAnnotation(Foo)]);
    });

    test("", () => {
        const foo = AnnotationRegistry.get(FieldAnnotation, Foo);
        expect(foo).toStrictEqual([new FieldAnnotation(Foo.prototype, "foo", {nullable: true})]);
    });

    test("", () => {
        const opts = {collection: "bar"};

        @ODM.document({...opts})
        class Bar extends Foo {

        }

        const a = AnnotationRegistry.get(DocumentAnnotation, Bar);
        expect(a).toStrictEqual([new DocumentAnnotation(Bar, opts)]);
    });

    test("", () => {
        const opts1 = {collection: "bar"};
        const opts2 = {collection: "zoo"};

        @ODM.document({...opts2})
        @ODM.document({...opts1})
        class Bar extends Foo {

        }

        const a = AnnotationRegistry.get(DocumentAnnotation, Bar);
        expect(a).toStrictEqual([
            new DocumentAnnotation(Bar, opts1),
            new DocumentAnnotation(Bar, opts2),
        ]);
    });

    test("", () => {
        class Bar extends Foo {

        }

        const a = AnnotationRegistry.get(FieldAnnotation, Bar);
        expect(a).toHaveLength(0);
    });

    test("", () => {
        const opts = {name: "zoo", nullable: false};

        class Bar extends Foo {
            @ODM.field({...opts})
            protected name?: string;
        }

        const a = AnnotationRegistry.get(FieldAnnotation, Bar);
        expect(a).toStrictEqual([new FieldAnnotation(Bar.prototype, "name", opts)]);
    });
});
