const express = require('express');
const router = express.Router();
const adminAuth=require('../../admin/routes/auth')

router.use("/auth", adminAuth);

module.exports = router;