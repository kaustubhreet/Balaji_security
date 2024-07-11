const express = require('express');
const router = express.Router();
const fundmanages = require("../../mobileApi/routes/fundManagesRoutes");

router.use("/", fundmanages);

module.exports = router;