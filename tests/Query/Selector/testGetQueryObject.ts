import {Selector} from "../../../src/Query";

test("", () => {
    const expr = new Selector();
    expect(expr.getQueryObject()).toStrictEqual({});

    const expr2 = expr.eq(1);
    expect(expr2).toBe(expr);
    expect(expr.getQueryObject()).toStrictEqual({$eq: 1});

    expr.eq(2);
    expect(expr.getQueryObject()).toStrictEqual({$eq: 2});

    expr.ne(3);
    expect(expr.getQueryObject()).toStrictEqual({$eq: 2, $ne: 3});
});
