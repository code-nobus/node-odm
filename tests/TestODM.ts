import {ODM, SessionFactory} from "../src";

export class TestODM extends ODM {
    constructor() {
        super({
            sessionFactory: new SessionFactory(Promise.resolve({} as any)),
        });
    }
}
