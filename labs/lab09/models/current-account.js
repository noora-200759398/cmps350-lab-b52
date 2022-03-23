import BankAccount from "bank-account.js";

export default class CurrentAccount extends BankAccount {
    #monhtlyFee;

    constructor(number, type, balance, monthlyFee) {
        super(number, type, balance);
        this.#monthlyFee = monthlyFee;
    }

    deductFee() {
        super.withdraw(this.#monthlyFee);
    }

    // toJSON() {
    //     return {};
    // }
}
