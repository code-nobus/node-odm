export abstract class Annotation {
    public readonly class: Function;
    public abstract registryKey: PropertyKey;

    constructor(ctor: Function) {
        this.class = ctor;
    }
}
