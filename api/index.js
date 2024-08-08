const express = require("express");

const router = express.Router();

router.use("/auth", require("../auth/auth"));

router.use("/items", require("./items.js"));

module.exports = router;