import fs from "fs-extra";
import * as path from "path";

import CurrentAccount from "../models/current-account.js";
import SavingsAccount from "../models/savings-account.js";
import Transaction from "../models/transaction.js";

export default class BankRepository {
  #accounts;

  async initialize() {
    try {
      const data = await fs.readJson(path.join(path.resolve(), "data", "accounts.json"));
      this.#accounts = data.map(account => this.#accountFromObject(account));
    } catch (error) {
      this.#accounts = [];
    }
  }

  async readAccounts(type) {
    if (type && type !== "all") {
      return this.#accounts.filter(account => account.type === type);
    } else {
      return this.#accounts;
    }
  }

  async createAccount(account) {
    if ("id" in account) {
      if (this.#accounts.some(acc => acc.id === account.id)) {
        return null;
      }
    } else {
      account.id = Math.max(...this.#accounts.map(acc => acc.id)) + 1;
    }

    const instance = this.#accountFromObject(account)
    this.#accounts.push(instance);

    await fs.writeJson(path.join(path.resolve(), "data", "accounts.json"), this.#accounts);
    return instance;
  }

  async readAccount(id) {
    const index = this.#accounts.map(account => account.id).indexOf(id);

    if (index >= 0) {
      return this.#accounts[index];
    } else {
      return null;
    }
  }

  async updateAccount(id, account) {
    const index = this.#accounts.map(acc => acc.id).indexOf(id);

    if (index >= 0) {
      const instance = this.#accountFromObject({ ...account, id: id });
      this.#accounts[index] = instance;

      await fs.writeJson(path.join(path.resolve(), "data", "accounts.json"), this.#accounts);
      return instance;
    } else {
      return null;
    }
  }

  async deleteAccount(id) {
    const index = this.#accounts.map(acc => acc.id).indexOf(id);

    if (index >= 0) {
      this.#accounts.splice(index, 1);

      await fs.writeJson(path.join(path.resolve(), "data", "accounts.json"), this.#accounts);
      return true;
    } else {
      return false;
    }
  }

  async createTransaction(id, transaction) {
    try {
      const trans = new Transaction(transaction.type, transaction.amount);
      const index = this.#accounts.map(acc => acc.id).indexOf(id);

      if (index >= 0) {
        try {
          trans.execute(this.#accounts[index]);
        } catch (error) {
          return error;
        }

        await fs.writeJson(path.join(path.resolve(), "data", "accounts.json"), this.#accounts);
        return this.#accounts[index];
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  #accountFromObject(account) {
    if (account.type === "current") {
      return new CurrentAccount(account.id, account.type, account.balance, account.monthlyFee);
    }

    if (account.type === "savings") {
      return new SavingsAccount(account.id, account.type, account.balance, account.minimumBalance);
    }
  }
}
