const express = require("express");
const router = express.Router();

router.all("*", (req, res) => {
    res.status(200).json({"response": "Welcome to LOKL!"});
});

module.exports = router;