import BankRepository from "../repositories/bank-repository.js";

export default class BankService {
  #repository;

  async initialize() {
    this.#repository = new BankRepository();
    await this.#repository.initialize();
  }

  async readAccounts(req, res) {
    try {
      const result = await this.#repository.readAccounts(
        this.#parseString(req.query.type),
      );

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async createAccount(req, res) {
    try {
      const result = await this.#repository.createAccount(
        this.#parseBody(req.body),
      );

      if (result) {
        res.status(201).location(`/api/accounts/${result.id}`).json(result);
      } else {
        res.status(409).send("Duplicate account id.");
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async readAccount(req, res) {
    try {
      const result = await this.#repository.readAccount(
        this.#parseNumber(req.params.id));

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Invalid account id.");
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateAccount(req, res) {
    try {
      const result = await this.#repository.updateAccount(
        this.#parseNumber(req.params.id),
        this.#parseBody(req.body),
      );

      if (result) {
        res.status(201).location(`/api/accounts/${result.id}`).json(result);
      } else {
        res.status(404).send("Invalid account id.");
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async deleteAccount(req, res) {
    try {
      const result = await this.#repository.deleteAccount(
        this.#parseNumber(req.params.id),
      );

      if (result) {
        res.sendStatus(204);
      } else {
        res.status(404).send("Invalid account id.");
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async createTransaction(req, res) {
    try {
      const result = await this.#repository.createTransaction(
        this.#parseNumber(req.params.id),
        this.#parseBody(req.body),
      );

      if (result) {
        if (typeof result === 'string' || result instanceof String) {
          // the transaction has failed
          res.status(409).send(result);
        } else {
          // the transaction has succeeded
          res.status(201).location(`/api/accounts/${result.id}`).json(result);
        }
      } else {
        // the account was not found
        res.status(404).send("Invalid account id.");
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  #parseBody(body) {
    if (body) {
      const result = {};

      for (const key in body) {
        if (key === "id" ||
          key === "balance" ||
          key === "monthlyFee" ||
          key === "minimumBalance" ||
          key === "amount") {
          result[key] = Number(body[key]);
        } else {
          result[key] = String(body[key]);
        }
      }

      return result;
    } else {
      return body;
    }
  }

  #parseNumber(id) {
    if (id) {
      return Number(id);
    } else {
      return id;
    }
  }

  #parseString(type) {
    if (type) {
      return String(type);
    } else {
      return type;
    }
  }
}
