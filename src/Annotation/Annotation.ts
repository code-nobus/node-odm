export type AnnotationOptions<A extends Annotation> = A extends Annotation<infer O> ? O : never;

export abstract class Annotation<O = any> {
    public readonly class: Function;
    public readonly opts: Partial<O>;

    constructor(target: Function, opts?: O) {
        this.class = target;
        this.opts = {...opts};

        this.init();
    }

    protected init() {

    }
}
