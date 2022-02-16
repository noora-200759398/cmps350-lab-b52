class BankAccount {
    #accountNo = String(Math.trunc(Math.random() * 10000)).padStart(4, '0');
    #balance = 0;
    // testField = 1;

    // overloading constructors is not possible
    // constructor(balance = 0) {
    //     this.#balance = balance;
    // }

    constructor(balance = 0, accountNo = 0) {
        this.#balance = balance;
        this.#accountNo = accountNo;
    }

    get accountNo() {
        return this.#accountNo;
    }

    set accountNo(number) {
        this.#accountNo = number;
    }

    get balance() {
        return this.#balance;
    }

    set balance(newBalance) {
        this.#balance = newBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        } else {
            console.error("Amount must be positive.");
        }
    }

    withdraw(amount) {
        if (amount > 0) {
            if (this.#balance >= amount) {
                this.#balance -= amount;
            } else {
                console.log("Insufficient funds.");
            }
        } else {
            console.error("Amount must be positive.");
        }
    }

    toString() {
        return `Account #${this.#accountNo} has QR${this.#balance}`;
    }

    toJSON() {
        let properties = {
            accountNo: this.#accountNo,
            balance: this.#balance,
        };

        return JSON.stringify(properties);
    }
}

export { BankAccount };
//export { BankAccount as BK };
