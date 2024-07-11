const express = require('express');
const router = express.Router();
const user = require("../../mobileApi/routes/user");

router.use("/", user);

module.exports = router;