const express= require('express');
const router= express.Router();
const positionCommodityController= require('../../BankDetails/controllers/PositionCommodityController')

router.post('/positionCommodity/:email',positionCommodityController.positionCommodityCont)
router.delete('/positionCommodity/:id',positionCommodityController.deletePositionCommodity);
router.put('/positionCommodity/:id', positionCommodityController.updatePositionCommodity);
router.get('/positionCommodity/:email',positionCommodityController.getpositionCommodity);


module.exports=router;