require("dotenv").config();
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const app = express();

const { registerStrategy, loginStrategy, verifyStrategy } = require("./auth");
const {connection} = require("./connections/db");
const expressPort = process.env.PORT;
const errorRouter = require("./routes/error");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

app.use(express.json());
app.use(cors({origin : process.env.REACT_DOMAIN}));

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);
passport.use(verifyStrategy);

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("*", errorRouter);

app.listen(expressPort, () => {
    console.log(`Express listening on port ${process.env.PORT}`);
    connection.once("open", () => {
        console.log("Connected to Atlas");
    });
});
