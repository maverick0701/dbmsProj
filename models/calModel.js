const mongoose=require('mongoose');

const signUpschema=new mongoose.Schema({
   name:{
       type:String
   },
   detail:{
       type:String
   }
    
},{
    timestamps:true
});

const Cal=mongoose.model('Cal',signUpschema);
module.exports=Cal;