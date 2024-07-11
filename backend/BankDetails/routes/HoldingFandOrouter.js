const express= require('express');
const router= express.Router();
const holdingFandOController= require('../../BankDetails/controllers/HoldingFandOController')

router.post('/holdingFandO/:email',holdingFandOController.holdingFandOCont)
router.delete('/holdingFandO/:id',holdingFandOController.deleteHoldingFandO);
router.put('/holdingFandO/:id', holdingFandOController.updateHoldingFandO);
router.get('/holdingFandO/:email',holdingFandOController.getholdingFandO);


module.exports=router;