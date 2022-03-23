import express from "express";
import * as path from "path";

const router = express.Router();

// const options = {
//     root: path.join(path.resolve(), 'static'),
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     },
// };
// res.sendFile("file.ext", options);

router.route("/api/*")
.get((req, res, next) => {
    // res.status(404).json({
    //     message: "Invalid entry.",
    // });
    res.sendStatus(404);
});

// router.route("/")
// .get((req, res, next) => {
//     res.sendFile(path.join(path.resolve(), "static", "index.html"));
// });
//
// router.route("/new-account")
// .get((req, res, next) => {
//     res.sendFile(path.join(path.resolve(), "static", "new-account.html"));
// });
//
// router.route("/new-transaction")
// .get((req, res, next) => {
//     res.sendFile(path.join(path.resolve(), "static", "new-transaction.html"));
// });

router.route("*")
.get((req, res, next) => {
    // res.status(404).sendFile(path.join(path.resolve(), "static", "not-found.html"));
    res.sendStatus(404);
});

export default router;
