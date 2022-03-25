export default class BankAccount {
  #id;
  #type;
  #balance;

  constructor(id, type, balance) {
    this.#id = id;
    this.#type = type;
    this.#balance = balance;
  }

  get id() {
    return this.#id;
  }

  get balance() {
    return this.#balance;
  }

  get type() {
    return this.#type;
  }

  deposit(amount) {
    if (amount <= 0.0) {
      throw "Amount is not positive.";
    }

    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0.0) {
      throw "Amount is not positive.";
    }
    if (this.#balance < amount) {
      throw "Not enough funds.";
    }

    this.#balance -= amount;
  }

  toJSON() {
    return {
      id: this.#id,
      type: this.#type,
      balance: this.#balance,
    };
  }
}
