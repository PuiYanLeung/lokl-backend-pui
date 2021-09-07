require("dotenv").config();
const express = require("express");

const { connection } = require("./connections/db");
const port = process.env.EXPRESS_PORT;

const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${process.env.EXPRESS_PORT}`);
    connection.once("open", () => {
        console.log("Connected to Atlas");
    });
});
