import express from "express";
// import router from "./router.js";

const app = express();
app.set("port", 3000);

// app.use(express.static("static"));
// app.use(express.json);
// app.use('/', router);

app.listen(app.get("port"), () => {
    console.log(`@ http://localhost:${app.get("port")}`);
});
