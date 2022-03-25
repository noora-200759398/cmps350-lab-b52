import BankAccount from "./bank-account.js";

export default class CurrentAccount extends BankAccount {
  #monthlyFee;

  constructor(id, type, balance, monthlyFee) {
    super(id, type, balance);
    this.#monthlyFee = monthlyFee;
  }

  deductFee() {
    super.withdraw(this.#monthlyFee);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      monthlyFee: this.#monthlyFee,
    };
  }
}
