const mongoose=require('mongoose');


const signUpschema=new mongoose.Schema({
    nutId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    },
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
    cost:{
        type:String
    }
},{
    timestamps:true
});


const Nutrionist=mongoose.model('Nutrionist',signUpschema);
module.exports=Nutrionist;