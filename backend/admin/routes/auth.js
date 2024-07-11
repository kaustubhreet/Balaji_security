const express= require('express')
const router= express.Router();
const authenticate=require('../../helper/jwtAuth')
const adminContoller=require('../controllers/adminController');
const upload=require('../../helper/fileUpload');

router.post('/register', adminContoller.register);

router.post('/login', adminContoller.login);

router.post('/addBankDetails',upload.fields([{name:'QRImage',maxCount:1}]),adminContoller.addBankDetails);

router.put('/change-password',authenticate,adminContoller.changePassword);

router.post('/forget-password',adminContoller.forgotPassword);

router.post('/reset-password',adminContoller.resetPassword);

router.get('/getusers',authenticate,adminContoller.getUsers);

router.get('/profile',authenticate,adminContoller.getAdmin);
router.get('/getadminbankdetails',authenticate,adminContoller.getadminBankDetails);

module.exports=router