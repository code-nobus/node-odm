import {Expr} from "../../../src/Query";

test("", () => {
    const expr = new Expr();
    expect(expr.getCondition()).toStrictEqual({});

    const expr2 = expr.eq(1);
    expect(expr2).toBe(expr);
    expect(expr.getCondition()).toStrictEqual({$eq: 1});

    expr.eq(2);
    expect(expr.getCondition()).toStrictEqual({$eq: 2});

    expr.ne(3);
    expect(expr.getCondition()).toStrictEqual({$eq: 2, $ne: 3});
});
