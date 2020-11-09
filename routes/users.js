const express=require('express');
const router=express.Router();
const usersController=require('../controller/users_controller');
const passport = require('passport');


router.post('/create',usersController.create);
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/'}
),usersController.createSessions);
router.get('/myProfile/:id',usersController.myProfile);
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/signout',usersController.destroySession);
router.post('/update/:id',usersController.update);
router.post('/connect/:id',usersController.createConnection);
router.post('/food/detail',usersController.calCon);
router.post('/find',usersController.findCal);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSessions);
module.exports=router;