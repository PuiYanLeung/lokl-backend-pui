require("dotenv").config();
const express = require("express");
const app = express();

const { connection } = require("./connections/db");
const expressPort = process.env.PORT;

app.use(express.json());

app.listen(expressPort, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    connection.once("open", () => {
        console.log("Connected to Atlas");
    });
});
