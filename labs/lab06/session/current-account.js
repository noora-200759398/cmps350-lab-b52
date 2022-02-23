import { BankAccount } from "./bank-account.js";

class CurrentAccount extends BankAccount {
    #monthlyFee;
    #type = "Current";

    constructor(balance = 0, accountNo = 0, monthlyFee = 0) {
        super(balance, accountNo);
        this.#monthlyFee = monthlyFee;
    }

    deductFee() {
        super.balance -= this.#monthlyFee;
    }

    get type() {
        return this.#type;
    }

    toString() {
        return `Current ${super.toString()} with QR${this.#monthlyFee} monthly fee`;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            monthlyFee: this.#monthlyFee,
            type: this.#type,
        };
    }
}

export { CurrentAccount };
