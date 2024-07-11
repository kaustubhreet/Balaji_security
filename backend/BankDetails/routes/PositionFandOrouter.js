const express= require('express');
const router= express.Router();
const positionFandOController= require('../../BankDetails/controllers/PositionFandOController')

router.post('/positionFandO/:email',positionFandOController.positionFandOCont)
router.delete('/positionFandO/:id',positionFandOController.deletePositionFandO);
router.put('/positionFandO/:id', positionFandOController.updatePositionFandO);
router.get('/positionFandO/:email',positionFandOController.getpositionFandO);


module.exports=router;