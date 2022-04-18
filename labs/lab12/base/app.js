import express from "express";
import router from "./router.js";
import morgan from "morgan";

const port = 5000;
const app = express();

//two types [dynamic , static]

app.use(express.static("views"));

app.use(morgan("dev"));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server started @http://localhost:${port}`);
});
