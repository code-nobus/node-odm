import {FieldAnnotation} from "../../../../src/Annotation/Property";
import {AnnotationError} from "../../../../src/Error";

describe("", () => {
    const data = [
        ["", {}],
        ["foo", {name: ""}],
        ["foo", {name: "foo.bar"}],
        ["foo", {name: "$args"}],
        ["$args", {name: ""}],
    ];

    test.each(data)("new FieldAnnotation(, %o, %o) throws ", (property, options) => {
        class Test {
        }

        expect(() => new FieldAnnotation(Test.prototype, property, options)).toThrow(AnnotationError);
    });
});
