const express = require('express');
const router = express.Router();
const userController = require('../../mobileApi/controllers/user')
const upload = require('../../helper/fileUpload');
const authentication = require('../../helper/jwtAuth');

router.post('/register', upload.fields([{ name: 'passportImage', maxCount: 1 }, { name: 'adharCardFront', maxCount: 1 }, { name: 'adharCardBack', maxCount: 1 }, { name: 'panCard', maxCount: 1 }, { name: 'bankPassbook', maxCount: 1 }]), userController.userRegister);

router.post('/login', userController.userLogin);
router.post('/forget-password',userController.forgotPassword);

router.post('/reset-password',userController.resetPassword);

router.put('/change-password', authentication, userController.changePassword);

router.get('/profile', authentication, userController.profile)
//router.post('/holdingEquity/:email',userController.holdingEquityCont)
router.get('/bankDetails', authentication, userController.getBankDetails);

router.post('/requestwithdrawal/:email', authentication, userController.addWithdrawalRequest);
router.put('/editrequestwithdrawal/:email/:id', userController.editWithdrawalRequest);
router.delete('/deleterequestwithdrawal/:email/:id', authentication, userController.deleteWithdrawalRequest);
router.get('/requestwithdrawal/:email', userController.getWithdrawalRequests);

router.put('/updateWithdrawalRequestFromAdmin/:email/:id', userController.updateWithdrawalRequestFromAdmin);
router.get('/getamount/:email',  userController.getAmountByEmail);

module.exports = router;