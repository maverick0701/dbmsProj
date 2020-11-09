const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const signUpschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    connection:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Trainer'
        },
    TrainerName:{
        type:String
    },
    NutConnection:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Nutrionist'
    },
    Nutname:{
        type:String
    }
    
},{
    timestamps:true
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('__dirname','..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

signUpschema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
signUpschema.statics.avatarPath=AVATAR_PATH;
const User=mongoose.model('User',signUpschema);
module.exports=User;