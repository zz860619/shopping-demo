const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

//serializeUser get the promise from done() and get the user
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user=>{
        done(null,user);
    })
});


passport.use(
    new GoogleStrategy({
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy:true
    },async (accessToken,refreshToken,profile,done) => {
        const existingUser = await User.findOne({googleId:profile.id})
            if(existingUser){
                // User existed
                return done(null,existingUser);
            }
            const user =await new User({googleId:profile.id,isAdmin:false}).save();
            done(null,user);
            
        
    })
);
