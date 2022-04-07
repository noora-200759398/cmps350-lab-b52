import fs from "fs-extra";
import * as path from "path";
import mongoose from "mongoose";

import Account from "../models/account.js";
import Transaction from "../models/transaction.js";

export default class BankRepository {
  async initialize() {
    try {
      const hostname = "localhost";
      const port = 27017;
      const database = "bank";
      const uri = `mongodb://${hostname}:${port}/${database}`;

      mongoose.connect(uri, function(error) {
        if (error) {
          console.error(error);
        }
      });

      const accounts = await Account.find();
      if (!accounts.length) {
        const data = await fs.readJson(path.join(path.resolve(), "data", "accounts.json"));
        data.forEach(async (ele) => {
          // ele = { ...ele, _id: ele.id };
          // const account = new Account(ele);
          // await account.save();
          await Account.create(ele);
        });
      }
    } catch (error) {}
  }

  async readAccounts(type) {
    if (type && type !== "all") {
      return await Account.find({ type: type }, { _id: 0, __v: 0 }).sort({ id: 1 });
      // return await Account.find({ type: type }).select("-_id -__v");
    } else {
      return await Account.find({}, { _id: 0, __v: 0 }).sort({ id: 1 });
    }
  }

  async createAccount(account) {
    if ("id" in account) {
      const result = await Account.findOne({ id: account.id }, { _id: 0, __v: 0 });

      if (result) {
        return null;
      } else {
        // const doc = new Account(account);
        // return await doc.save();
        return await Account.create(account);
      }
    } else {
      // const maxId = await this.#getMaxId();
      const max = await Account.findOne().sort({ id: -1 });
      return await Account.create({ ...account, id: Number(max.id) + 1 });
    }
  }

  async readAccount(id) {
    return await Account.findOne({ id: id }, { _id: 0, __v: 0 });
  }

  async updateAccount(id, account) {
    const result = await Account.updateOne({ ...account, id: id });

    if (result.matchedCount !== 0) {
      // if (result.modifiedCount !== 0) {
      return await Account.findOne({ id: id }, { _id: 0, __v: 0 });
    } else {
      return null;
    }
  }

  async deleteAccount(id) {
    const result = await Account.deleteOne({ id: id });
    return result.deletedCount !== 0;
  }

  async createTransaction(id, transaction) {
    try {
      const acct = await Account.findOne({ id: id });

      if (acct) {
        const trans = new Transaction({ ...transaction, account: id });
        trans.execute(acct);
        await trans.save();
        // await Transaction.create({ ...transaction, account: id });
        await acct.save();
        const result = await Account.findOne({ id: id }, { _id: 0, __v: 0 });
        return result;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async readTransactions() {
    return await Transaction.find({}, { _id: 0, __v: 0 }).sort({ account: 1 });
  }

  async getTotalBalance(type) {
    const types = !type || type === "all" ? ["current", "savings"] : [type];

    return await Account.aggregate([{
      $match: {
        type: {
          $in: types,
        },
        balance: {
          $gt: 0,
        },
      },
    }, {
      $group: {
        _id: null,
        total: {
          $sum: "$balance"
        },
        count: {
          $sum: 1
        }
      }
    }, {
      $project: {
        _id: 0,
        total: 1,
        count: 1,
      }
    }]);
  }

  //   async #getMaxId() {
  //     const result = await Account.aggregate([{
  //       $group: {
  //         _id: null,
  //         maxId: {
  //           $max: "$id"
  //         },
  //       }
  //     }, {
  //       $project: {
  //         _id: 0,
  //         maxId: 1,
  //       }
  //     }]);
  //
  //     return result[0].maxId;
  //   }
}
