export abstract class Annotation<O = any> {
    public readonly class: Function;
    public readonly opts: Partial<O>;

    constructor(target: Function, opts?: O) {
        this.class = target;
        this.opts = {...opts};

        this.init();
    }

    public static decorate(): ClassDecorator | MethodDecorator | PropertyDecorator | ParameterDecorator | void {

    }

    protected init() {

    }
}
