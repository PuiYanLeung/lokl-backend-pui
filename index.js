require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const {connection} = require("./connections/db");
const expressPort = process.env.PORT;
const errorRouter = require("./routes/error");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("*", errorRouter);

app.listen(expressPort, () => {
    console.log(`Express listening on port ${process.env.PORT}`);
    connection.once("open", () => {
        console.log("Connected to Atlas");
    });
});
