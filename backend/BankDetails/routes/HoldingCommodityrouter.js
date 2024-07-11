const express= require('express');
const router= express.Router();
const holdingCommodityController= require('../../BankDetails/controllers/HoldingCommodityController')
const depositeController=require('../../BankDetails/controllers/DepositeController');

router.post('/holdingCommodity/:email',holdingCommodityController.holdingCommodityCont)
router.delete('/holdingCommodity/:id',holdingCommodityController.deleteHoldingCommodity);
router.put('/holdingCommodity/:id', holdingCommodityController.updateHoldingCommodity);
router.get('/holdingCommodity/:email',holdingCommodityController.getholdingCommodity);

router.get('/deposite/:email',depositeController.getdeposite);
router.post('/deposite/:email',depositeController.createdeposite);
router.put('/deposite/:id',depositeController.updatedeposite);
router.delete('/deposite/:id',depositeController.deletedeposite);

module.exports=router;