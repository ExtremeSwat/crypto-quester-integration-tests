export class TableLandOptions {
    public chain: string | undefined;
    public contract: string;
    public network: string;

    constructor(chain: string | undefined, contract: string, network: string) {
        this.chain = chain;
        this.contract = contract;
        this.network = network;
    }
}