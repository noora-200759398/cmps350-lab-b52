import { BankAccount } from "./bank-account.js";

class SavingAccount extends BankAccount {
    #minBalance;
    #type = "Saving";

    constructor(balance = 0, accountNo = 0, minBalance = 0) {
        super(balance, accountNo);
        this.#minBalance = minBalance;
    }

    distributeBenefit(benefitPercentage = 0.01) {
        super.balance += super.balance * benefitPercentage;
    }

    get type() {
        return this.#type;
    }

    toString() {
        return `Saving ${super.toString()} with QR${this.#minBalance} minimum balance`;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            minBalance: this.#minBalance,
            type: this.#type,
        };
    }
}

export { SavingAccount };