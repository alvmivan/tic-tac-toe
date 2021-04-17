import PengineClient from "./PengineClient";

export class AI
{
    pengine;

    constructor() {
        this.pengine = new PengineClient();
    }
}