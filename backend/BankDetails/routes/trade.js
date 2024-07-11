const express= require('express');
const router= express.Router();
const userController= require('../../mobileApi/controllers/user')
//const upload= require('../../helper/fileUpload');
const authentication=require('../../helper/jwtAuth')

router.post('/register',upload.fields([{name:'passportImage',maxCount:1},{name:'adharCardFront',maxCount:1},{name:'adharCardBack',maxCount:1},{name:'panCard',maxCount:1},{name:'bankPassbook',maxCount:1}]), userController.userRegister);
 
router.post('/login' , userController.userLogin);

router.put('/change-password',authentication,userController.changePassword);

router.get('/profile',authentication,userController.profile)

module.exports=router