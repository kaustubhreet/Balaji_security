const express = require('express');
const router = express.Router();
const adminRoutes = require('./api/admin');
const userRoutes = require('./api/user');
const positionHoldingRoutes=require('./api/positionHolding');
//const fundApiRoutes=require('./api/fundManages');

router.use("/admin", adminRoutes);
router.use("/mobileApi", userRoutes);
//router.use("/fundApi", fundApiRoutes);
router.use("/positionHoldingApi", positionHoldingRoutes);

module.exports = router;