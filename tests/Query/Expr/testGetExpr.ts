import {Expr} from "../../../src/Query";

test("", () => {
    const expr = new Expr();
    expect(expr.getExpr()).toStrictEqual({});

    const expr2 = expr.eq(1);
    expect(expr2).toBe(expr);
    expect(expr.getExpr()).toStrictEqual({$eq: 1});

    expr.eq(2);
    expect(expr.getExpr()).toStrictEqual({$eq: 2});

    expr.ne(3);
    expect(expr.getExpr()).toStrictEqual({$eq: 2, $ne: 3});
});
