
export default class APIResponse {
    public earn: number;
    public earnPercent: string;
    public spend: number;
    public spendPercent: string;
    public newClient: number;
    public newClientPercent: string;

    constructor(
        earn: number,
        earnPercent: string,
        spend: number,
        spendPercent: string,
        newClient: number,
        newClientPercent: string
    ) {
        this.earn = earn;
        this.earnPercent = earnPercent;
        this.spend = spend;
        this.spendPercent = spendPercent;
        this.newClient = newClient;
        this.newClientPercent = newClientPercent;
    }

    // You can add getters and setters if needed
    public getEarn(): number {
        return this.earn;
    }

    public getEarnPercent(): string {
        return this.earnPercent;
    }

    public getSpend(): number {
        return this.spend;
    }

    public getSpendPercent(): string {
        return this.spendPercent;
    }

    public getNewClient(): number {
        return this.newClient;
    }

    public getNewClientPercent(): string {
        return this.newClientPercent;
    }
}