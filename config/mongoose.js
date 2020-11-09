const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://maverick:amanis3937@cluster0.s0lia.mongodb.net/dbmsProj?retryWrites=true&w=majority');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to mongo db'));

db.once('open',function()
{
    console.log('connected to the database');
})

module.exports=db;