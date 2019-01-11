export abstract class Annotation {
    public readonly ctor: Function;
    public abstract registryKey: PropertyKey;

    constructor(ctor: Function) {
        this.ctor = ctor;
    }
}
