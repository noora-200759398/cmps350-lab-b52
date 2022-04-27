import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import router from "./router.js";

const port = 8080;
const app = express();

app.use(express.static("public"));

app.engine("hbs", engine({
  extname: "hbs",
  // defaultLayout: "main",
  // layoutsDir: "views/layouts/",
}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(morgan("dev"));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server started @http://localhost:${port}`);
});
