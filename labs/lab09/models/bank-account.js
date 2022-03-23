export default class BankAccount {
    #number;
    #type;
    #balance;

    constructor(number, type, balance) {
        this.#number = number;
        this.#type = type;
        this.#balance = balance;
    }

    get balance() {
        return this.#balance;
    }

    deposit(amount) {
        if (amount <= 0.0) {
            throw new Error("Amount is not positive.");
        }

        this.#balance += amount;
    }

    withdraw(amount) {
        if (amount <= 0.0) {
            throw new Error("Amount is not positive.");
        }
        if (this.#balance < amount) {
            throw new Error("Not enough funds.");
        }

        this.#balance -= amount;
    }

    // toJSON() {
    //     return {};
    // }
}
