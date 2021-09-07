const mongoose = require("mongoose");

const connection = mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bytlh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = connection;