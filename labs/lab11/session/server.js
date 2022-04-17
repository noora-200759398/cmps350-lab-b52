import express from "express";
import morgan from "morgan";

const server = express();
server.set("port", process.env.PORT || 3000);

server.use(morgan("dev"));
server.use(express.static("."));

server.listen(server.get("port"), () => {
    console.log(`@ http://localhost:${server.get("port")}`);
});

export default server;
