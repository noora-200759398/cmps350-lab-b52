export default class Transaction {
  #type;
  #amount;

  constructor(type, amount) {
    this.#type = type;
    this.#amount = amount;
  }

  execute(account) {
    if (this.#type === "deposit") {
      account.deposit(this.#amount);
    } else if (this.#type === "withdraw") {
      account.withdraw(this.#amount);
    } else {
      throw "Invalid transaction type";
    }
  }

  toJSON() {
    return {
      type: this.#type,
      amount: this.#amount,
    };
  }
}
