const express= require('express');
const router= express.Router();
const positionEquityController= require('../../BankDetails/controllers/PositionEquityController')

router.post('/positionEquity/:email',positionEquityController.positionEquityCont)
router.delete('/positionEquity/:id',positionEquityController.deletePositionEquity);
router.put('/positionEquity/:id', positionEquityController.updatePositionEquity);
router.get('/positionEquity/:email',positionEquityController.getpositionEquity);


module.exports=router;