const express = require("express");

const router = express.Router();

router.use("/auth", require("../auth/auth"));

router.use("/items", require("./items.js"));

router.use("/reviews", require("./reviews.js"));

module.exports = router;