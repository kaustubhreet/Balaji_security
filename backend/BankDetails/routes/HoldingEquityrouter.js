const express= require('express');
const router= express.Router();
const holdingEquityController= require('../../BankDetails/controllers/HoldingEquityController')

router.post('/holdingEquity/:email',holdingEquityController.holdingEquityCont)
router.delete('/holdingEquity/:id',holdingEquityController.deleteHoldingEquity);
router.put('/holdingEquity/:id', holdingEquityController.updateHoldingEquity);
router.get('/holdingEquity/:email',holdingEquityController.getholdingEquity);


module.exports=router;