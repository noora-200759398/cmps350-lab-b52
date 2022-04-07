import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../server.js";

chai.use(chaiHttp);

describe("GET /api/accounts", () => {
  it("it returns a JSON array with all accounts", (done) => {
    chai.request(server)
      .get("/api/accounts")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        expect(res.body).to.be.an("array");
        expect(res.body).to.not.be.empty;
        expect(res.body[0]).to.have.property("id");
        expect(res.body[0]).to.have.property("type");
        expect(res.body[0]).to.have.property("balance");

        done();
      });
  });
});

describe("GET /api/accounts?type=savings", () => {
  it("it returns a JSON array with all the savings accounts", (done) => {
    chai.request(server)
      .get("/api/accounts")
      .query({ type: "savings" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        expect(res.body).to.be.an("array");
        // expect(res.body).to.not.be.empty;
        expect(res.body.every(account => account.type === "savings")).to.be.true;

        done();
      });
  });
});

describe("POST /api/accounts", () => {
  it("it creates an account using the JSON body", (done) => {
    chai.request(server)
      .post("/api/accounts")
      .send({
          // id: 94892,
          type: "current",
          balance: 997,
          monthlyFee: 0.15,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.be.oneOf([ 201, 409 ]);
        if (res.status === 201) {
          expect(res).to.be.json;

          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("type");
          expect(res.body).to.have.property("balance");
        }

        done();
      });
  });
});

describe("GET /api/banks", () => {
  it("it returns an error message with status 404", (done) => {
    chai.request(server)
      .get("/api/banks")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);

        done();
      });
  });
});

const deleteId = 1101;
describe("DELETE /api/accounts/:id", () => {
  it(`it deletes the account with the provided id (${deleteId})`, (done) => {
    chai.request(server)
      .delete(`/api/accounts/${deleteId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        expect(res.body).to.be.empty;

        done();
      });
  });
});
