import express from "express";
import * as path from "path";
import BankService from "./services/bank-service.js";

const router = express.Router();
const service = new BankService();

await service.initialize();
// service.initialize()
//   .then((result) => {})
//   .catch((error) => {})
//   .finally(() => {});

// const options = {
//     root: path.join(path.resolve(), 'static'),
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     },
// };
// res.sendFile("file.ext", options);

router.route("/api/accounts/:id/transaction")
  .post(service.createTransaction.bind(service))
  .all((_, res) => res.sendStatus(405));

router.route("/api/accounts/:id")
  .get(service.readAccount.bind(service))
  .put(service.updateAccount.bind(service))
  .delete(service.deleteAccount.bind(service))
  .all((_, res) => res.sendStatus(405));

router.route("/api/accounts")
  .get(service.readAccounts.bind(service))
  .post(service.createAccount.bind(service))
  .all((_, res) => res.sendStatus(405));

// router.route("/")
//   .get((_, res) => {
//     res.sendFile(path.join(path.resolve(), "static", "index.html"));
//   });

// router.route("/new-account")
// .get((_, res) => {
//     res.sendFile(path.join(path.resolve(), "static", "new-account.html"));
// });

// router.route("/new-transaction")
// .get((_, res) => {
//     res.sendFile(path.join(path.resolve(), "static", "new-transaction.html"));
// });

// router.route("/api/*")
//   .all((_, res) => {
//     // if (req.accepts("application/json")) {
//     //   res.status(404).json({
//     //     status: 404,
//     //     message: "Resource not found.",
//     //   });
//     // } else {
//     //   res.sendStatus(404);
//     // }
//
//     res.sendStatus(404);
//   });

router.route("*")
  .all((req, res) => {
    if (req.accepts("text/html")) {
      // res.render("404", { url: req.url });
      res.status(404).sendFile(path.join(path.resolve(), "static", "not-found.html"));
    } else {
      res.sendStatus(404);
    }

    // res.sendStatus(404);
  });

export default router;
