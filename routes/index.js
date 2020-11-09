const express=require('express');
const passport = require('passport');
const homeController=require('../controller/home_controller');



const router=express.Router();

//add list of routes each route should have route here
router.get('/',homeController.home);
router.use('/likes', require('./likes'));
router.use('/users',require('./users'));


module.exports=router;