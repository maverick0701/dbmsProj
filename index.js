const express=require('express');
const app=express();
const port=8030;
const nodeSassMiddleware = require('node-sass-middleware');
const sassMiddleware=require('node-sass-middleware');
const expressLayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
const { request } = require('express');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-stratergy');
const passportGoogle = require('./config/passport-google-oauthstrategy');
const MongoStore=require('connect-mongo')(session);
const flash = require('connect-flash');
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(express.urlencoded());
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chatsocket').chatSockets(chatServer);
const customMware=require('./config/middleware');
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

app.use(sassMiddleware({
    src:'./assets/scss',//from where to pick up css file for compilation
    dest:'./assets/css',
    debug:true,//when in production put false
    outputStyle:'extended',
    prefix:'/css'//where should look into for css
}))
app.use(express.static('./assets'))
app.use(cookieParser());

app.use(session({
    name:'dbms',
    secret:'hellhellishdbdbtimeWaste',
    saveUninitialized:false,
    resave:false,
    cookie:{
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err||'connected to mongo db setup');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views','./views');


app.use(flash());
app.use(customMware.setFlash);


app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err)
    {
        console.log('error here at line 77 in index.js');
        return;
    }
    console.log('server is running on port:',port)
});
