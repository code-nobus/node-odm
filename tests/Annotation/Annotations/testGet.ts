import {Annotations} from "@sirian/annotations";
import {DocumentAnnotation, FieldAnnotation, ODM} from "../../../src";

describe("", () => {
    @ODM.document()
    class Foo {
        @ODM.field({nullable: true})
        protected foo?: string;
    }

    test("", () => {
        const a = Annotations.getFirst(DocumentAnnotation, Foo)!;
        expect(a.options).toStrictEqual({});
    });

    test("", () => {
        const a = Annotations.getFirst(FieldAnnotation, Foo)!;
        expect(a.options).toStrictEqual({nullable: true});
    });

    test("", () => {
        const opts = {collection: "bar"};

        @ODM.document({...opts})
        class Bar extends Foo {

        }

        const a = Annotations.getFirst(DocumentAnnotation, Bar)!;
        expect(a.options).toStrictEqual(opts);
    });

    test("", () => {
        const opts1 = {collection: "bar"};
        const opts2 = {collection: "zoo"};

        @ODM.document({...opts2})
        @ODM.document({...opts1})
        class Bar extends Foo {

        }

        const a = Annotations.get(DocumentAnnotation, Bar);

        expect(a).toStrictEqual([
            DocumentAnnotation.create([Bar], [opts1]),
            DocumentAnnotation.create([Bar], [opts2]),
        ]);
    });

    test("", () => {
        class Bar extends Foo {

        }

        const a = Annotations.get(FieldAnnotation, Bar);
        expect(a).toHaveLength(0);
    });

    test("", () => {
        const opts = {name: "zoo", nullable: false};

        class Bar extends Foo {
            @ODM.field({...opts})
            protected name?: string;
        }

        const a = Annotations.getFirst(FieldAnnotation, Bar)!;
        expect(a.options).toStrictEqual(opts);
    });
});
