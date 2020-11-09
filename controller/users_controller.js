const { response } = require("express")
const User = require("../models/mongoose");
const Trainer=require('../models/trainer');
const Nutrionist=require('../models/nutritionist');
const fs=require('fs');//file sysytem
const path=require('path');
const Cal=require('../models/calModel');
module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirmPassword)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){
            console.log('error');
            return;
        }
    
        if(!user)
        {

            if(req.body.type=='user')
            {
                User.create({
                    email:req.body.email,
                    password:req.body.password,
                    name:req.body.name,
                    userType:req.body.type
                },function(err,user){
                    if(err)
                    {
                        console.log('error in signinig up ');
                        return;
                    }else{
                        return res.redirect('back');
                    }

                })}
            else if(req.body.type=='trainer')
            {
                User.create({
                    email:req.body.email,
                    password:req.body.password,
                    name:req.body.name,
                    userType:req.body.type
                },function(err,user){
                    if(err)
                    {
                        console.log('error in signinig up ');
                        return;
                    }else{
                        Trainer.create({
                            email:req.body.email,
                            password:req.body.password,
                            name:req.body.name,
                            userType:req.body.type,
                            trainerId:user._id
        
                        },function(err,trainer){
                            if(err)
                            {
                                console.log('error in signinig up ');
                                return;
                            }else{
                                return res.redirect('back');
                            }})
                        
                    }

                });
               
                }
                else
                {
                    User.create({
                        email:req.body.email,
                        password:req.body.password,
                        name:req.body.name,
                        userType:req.body.type
                    },function(err,user){
                        if(err)
                        {
                            console.log('error in signinig up ');
                            return;
                        }else{
                            Nutrionist.create({
                                email:req.body.email,
                                password:req.body.password,
                                name:req.body.name,
                                userType:req.body.type,
                                nutId:user._id
                            },function(err,trainer){
                                if(err)
                                {
                                    console.log('error in signinig up ');
                                    return;
                                }else{
                                    return res.redirect('back');
                                }
                        })}})

                }
            
        }
        else
        {
            return res.redirect('back');

        }
    })

    
}

module.exports.createSessions=async function(req,res)
{
    console.log("after session create",req.isAuthenticated());
    console.log('sesion created');
    let TrainerUser= await User.find({userType:'trainer'});
    let Trainers=await Trainer.find({});
    let nutri=await User.find({userType:'nutrionist'});
    // return res.render('profile.ejs',{
    //     trainers:Trainers,
    //     trainerUser:TrainerUser,
    //     nutri:nutri
    // });
    req.flash('success','logged in successfully');
    return res.redirect('/users/profile')
}

module.exports.profile=async function(req,res)
{
    let Trainers=await Trainer.find({});
    let TrainerUser= await User.find({userType:'trainer'});
    let nutri=await User.find({userType:'nutrionist'});
    let food=await Cal.findOne({name:'banana'});
    // req.flash('success','logged in successfully');
    return res.render('profile.ejs',{
         trainers:Trainers,
         trainerUser:TrainerUser,
         detail:food.detail,
         nutri:nutri
     });
}
module.exports.destroySession=function(req,res)
{
    console.log('sesion destroyed');
    req.flash('success','logged out successfully');
    req.logout();
    // req.flash('success','You have logged out');
    
    return res.redirect('/');
}

module.exports.update=async function(req,res)
{
    
    if(req.user.id==req.params.id)
    {
        try{
            // let user=await User.findByIdAndUpdate(req.params.id,req.body);
            let user=await User.findByIdAndUpdate(req.params.id);
            req.flash('success','Sucessfully Updated');
                // let user=await User.findByIdAndUpdate(req.params.id);
                User.uploadedAvatar(req,res,function(err)
                {
                    if(err){console.log('error in avatars******',err)};
                    user.name=req.body.name;
                    user.email=req.body.email;
                    if(user.userType=='trainer')
                    {
                        Trainer.findOne({trainerId:user.id},function(err,trainer)
                        {
                            console.log(trainer.name)
                            trainer.name=req.body.name;
                            trainer.email=req.body.email;
                            trainer.cost=req.body.cost;
                            trainer.save();
                        });
                    }
                    else if(user.userType=='nutrionist')
                    {
                        Nutrionist.findOne({nutId:user.id},function(err,nut)
                        {
                            nut.name=req.body.name;
                            nut.email=req.body.email;
                            nut.cost=req.body.cost;
                            nut.save();
                        });
                    }
                    if(req.file)
                    {
                        if(user.avatar)
                        {
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                        user.avatar=User.avatarPath+'/'+req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');
    
                })
            
           
           
        }catch(err)
        {
            console.log('error at line 11 in users_controller',err);
        }
        
       
        // User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        //     return res.redirect('back');
        // });
    }else{
        return res.status(401).send('Unauthorized')
    }
}

module.exports.myProfile=function(req,res)
{
    User.findById(req.params.id,function(err,profile_user)
    {
        if(profile_user._id==req.params._id)
        {
            console.log('true************************************************')
        }
        if(profile_user.userType=='trainer')
        {
            Trainer.findOne({trainerId:profile_user.id},function(err,trainer)
            {
                console.log('true************************************************')
                console.log(trainer.name);
                return res.render('myProfile.ejs',
                {
                    profile_user:profile_user,
                    myTrainer:trainer
                });

            })
        }
        else if(profile_user.userType=='nutrionist')
        {
            Nutrionist.findOne({nutId:profile_user.id},function(err,nut)
            {
                return res.render('myProfile.ejs',
                {
                    profile_user:profile_user,
                    nut:nut
                });

            })
        }
        else
        {
            // let myTrainer= await Trainer.findById(profile_user.collection);
            // console.log(myTrainer.id);
            return res.render('myProfile.ejs',
            {
                profile_user:profile_user
            });

        }
        

    });
    
}


module.exports.createConnection=async function(req,res)
{
    if(req.body.type=='nutrionist')
    {
        let nut=await Nutrionist.findOne({nutId:req.body.profileId});
        let user=await User.findById(req.params.id);
        user.NutConnection=nut._id;
        user.Nutname=nut.name;
        user.save();
        // console.log(user.connection);
        return res.redirect('back');

    }
    let trainer=await Trainer.findOne({trainerId:req.body.profileId});
    let user=await User.findById(req.params.id);
    console.log(trainer.name,'#$%^&$#$%^&*&^%$#$%^&*&^%$#$%^&*');
    user.connection=trainer._id;
    user.TrainerName=trainer.name;
    user.save();
    console.log(user.connection);
    req.flash('success','connection made');
    return res.redirect('back');

}


module.exports.calCon=function(req,res)
{
    Cal.create({
        name:req.body.foodName,
        detail:req.body.foodDetail
    },function(err,cal){
        if(err)
        {
            console.log('error in signinig up ');
            return;
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.findCal=async function(req,res)
{
    let Trainers=await Trainer.find({});
    let TrainerUser= await User.find({userType:'trainer'});
    let nutri=await User.find({userType:'nutrionist'});
    // req.flash('success','search result found');
    Cal.findOne({name:req.body.search},function(err,food)
    {
        // console.log(food.detail,'**(*(*(*(*(*(*(*(*(*(*(*(*(')

        if(err)
        {
            console.log('error in finding *****()(*&^%$#$%^&*^&**78876',err);
            return res.redirect('back');
        }
        else
        {
            // req.flash('success','search result found');
            return res.render('profile.ejs',{
                detail:food.detail,
                trainers:Trainers,
                trainerUser:TrainerUser,
                nutri:nutri
            });
        }
    })
}