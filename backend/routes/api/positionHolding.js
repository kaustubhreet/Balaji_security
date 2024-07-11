const express = require('express');
const router = express.Router();
const HoldingCommodityRoutes = require("../../BankDetails/routes/HoldingCommodityrouter");
const HoldingEquityRoutes=require('../../BankDetails/routes/HoldingEquityrouter');
const HoldingFandORoutes=require('../../BankDetails/routes/HoldingFandOrouter');
const PositionFandORoutes=require('../../BankDetails/routes/PositionFandOrouter');
const PositionCommodityRoutes=require('../../BankDetails/routes/PositionCommodityrouter');
const PositionEquityRoutes=require('../../BankDetails/routes/PositionEquityrouter');
const DepositeRoutes=require("../../BankDetails/routes/Depositerouter");

router.use("/", HoldingCommodityRoutes);
router.use("/", HoldingEquityRoutes);
router.use("/", HoldingFandORoutes);
router.use("/", PositionCommodityRoutes);
router.use("/", PositionEquityRoutes);
router.use("/", PositionFandORoutes);
router.use("/", DepositeRoutes);

module.exports = router;