const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/mongoose');

passport.use(new googleStrategy({
    clientID:,
    clientSecret:,
    callbackURL:
},
    function(accessToken,refreshToken,profile,done)
    {
        User.findOne({email:profile.emails[0].value}).exec(function(err,user)
        {
            if(err){console.log(err,"error is here line 15 google stratergy");return;}
            console.log(profile);
            if(user)
            {
                return done(null,user);
            }
            else
            {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    userType:'user',
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user)
                {
                    if(err){console.log(err,"error is here line 29 google stratergy");return;}
                    return done(null,user);
                })
            }
        })
    }
))
