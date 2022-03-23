import BankAccount from "bank-account.js";

export default class SavingAccount extends BankAccount {
    #minimumBalance;

    constructor(number, type, balance, minimumBalance) {
        super(number, type, balance);
        this.#minimumBalance = minimumBalance;
    }

    addBenefit(benefitRate) {
        if (benefitRate <= 0.0) {
            throw new Error("Benefit rate is not positive.");
        }

        super.deposit(super.balance * benefitRate);
    }

    // toJSON() {
    //     return {};
    // }
}
