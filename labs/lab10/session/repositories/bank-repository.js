import fs from "fs-extra";
import * as path from "path";
import mongoose from "mongoose";

import Account from "../models/account.js";
import Transaction from "../models/transaction.js";

export default class BankRepository {
  async initialize() {
    try {
      const hostname = "localhost";
      const port = "27017";
      const database = "bank";
      const uri = `mongodb://${hostname}:${port}/${database}`;

      mongoose.connect(uri, async function(error) {
        if (error) {
          console.error(error);
        } else {
          const count = await Account.countDocuments({});

          if (!count) {
            const data = await fs.readJson(path.join(path.resolve(), "data", "accounts.json"));
            data.forEach(async (ele) => {
              // ele = { ...ele, _id: ele.id };
              // const account = new Account(ele);
              // await account.save();
              await Account.create(ele);
            });
          }
        }
      });
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
      const result = await Account.findOne({ id: account.id });

      if (result) {
        return null;
      } else {
        // const accout = new Account(account);
        // return await account.save();
        await Account.create(account);
        return Account.findOne({ id: account.id }, { _id: 0, __v: 0 });
      }
    } else {
      // const maxId = await this.#getMaxId();
      const result = await Account.findOne({}).sort({ id: -1 });
      await Account.create({ ...account, id: result.id + 1 });
      return Account.findOne({ id: result.id + 1 }, { _id: 0, __v: 0 });
    }
  }

  async readAccount(id) {
    return await Account.findOne({ id: id }, { _id: 0, __v: 0 });
  }

  async updateAccount(id, account) {
    const result = await Account.updateOne({ id: id }, account);

    if (result.matchedCount !== 0) {
      // if (result.modifiedCount === 0) { } // not updated
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
      const account = await Account.findOne({ id: id });

      if (account) {
        try {
          const trans = await Transaction.create({ ...transaction, account: account._id });
          trans.execute(account);
          await account.save();

          return await Account.findOne({ id: id }, { _id: 0, __v: 0 });
        } catch (error) {
          return error;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async readTransactions() {
    return await Transaction.find({}, { _id: 0, __v: 0 }).sort({ date: 1 });
  }

  async getTotalBalance(type) {
    const types = !type || type === "all" ? ["current", "savings"] : [type];
    //     const result = await Account.find();
    //     console.log(result);
    //
    //     return {
    //       total: result.reduce((acc, ele) => acc + ele.balance, 0),
    //       count: result.length,
    //     };

    const result = await Account.aggregate([{
      $match: {
        balance: {
          $gt: 0,
        },
        type: {
          $in: types,
        },
      }
    }, {
      $group: {
        // _id: "$type",
        _id: null,
        total: {
          $sum: "$balance",
        },
        count: {
          $sum: 1,
        }
      },
    }, {
      $project: {
        _id: 0,
        total: 1,
        count: 1,
      },
    }]);

    // delete result[0]._id;
    return result[0];
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
