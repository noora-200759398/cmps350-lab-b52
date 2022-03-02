// import { BankAccount } from "./bank-account.js";
import { CurrentAccount } from "./current-account.js";
import { SavingAccount } from "./saving-account.js";

class Bank {
    #accounts = [];

    constructor(accounts = []) {
        this.#accounts = accounts;
    }

    add(account) {
        this.#accounts.push(account);
    }

    getAccount(accountNo) {
        // for (const ele of this.#accounts) {
        //     if (ele.accountNo === accountNo) {
        //         return ele;
        //     }
        // }

        this.#accounts.find(ele => ele.accountNo === accountNo);
    }

    get accounts() {
        return this.#accounts;
    }

    set accounts(accounts) {
        this.#accounts = accounts;
    }

    deleteAccount(accountNo) {
        // let newAccounts = [];
        // for (const ele of this.#accounts) {
        //     if (ele.accountNo !== accountNo) {
        //         newAccounts.push(ele);
        //     }
        // }
        // this.#accounts = newAccounts;

        this.#accounts = this.#accounts.filter(ele => ele.accountNo !== accountNo);
    }

    averageBalance() {
        return this.totalBalance() / this.#accounts.length;
    }

    totalBalance() {
        return this.#accounts.reduce((acc, ele) => acc + ele.balance, 0);

        // this.#accounts.map(ele => ele.balance)
        //     .reduce((acc, ele) => acc + ele, 0);
    }

    toJSON() {
        return {
            accounts: this.#accounts
        };

        // return JSON.stringify(this.#accounts.map(ele => ele.toJSON()));
    }

    fromJSON(properties) {
        this.#accounts = properties.accounts;
    }

    serialize() {
        return JSON.stringify(this);
    }

    deserialize(accountString) {
        let data = JSON.parse(accountString);

        return data.accounts.map(function (ele) {
            if (ele["type"] === "Current") {
            // if (ele["deductFee"]) {
                // CurrentAccount
                return new CurrentAccount(ele.balance, ele.accountNo, ele.monthlyFee);
            } else if (ele["type"] === "Saving") {
            // } else if (ele["distributeBenefit"]) {
                // SavingAccount
                return new SavingAccount(ele.balance, ele.accountNo, ele.minBalance);
            } else {
            }
        });
    }
}

export { Bank };