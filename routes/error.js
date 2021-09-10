const express = require("express");
const router = express.Router();

router.all("*", (req, res) => {
    res.status(500).json({response: "server error"});
});

module.exports = router;
