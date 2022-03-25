import BankAccount from "./bank-account.js";

export default class SavingsAccount extends BankAccount {
  #minimumBalance;

  constructor(id, type, balance, minimumBalance) {
    super(id, type, balance);
    this.#minimumBalance = minimumBalance;
  }

  addBenefit(benefitRate) {
    if (benefitRate <= 0.0) {
      throw "Benefit rate is not positive.";
    }

    super.deposit(super.balance * benefitRate);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      minimumBalance: this.#minimumBalance,
    };
  }
}
