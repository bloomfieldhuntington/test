// passport.js
// desciption: 
// developer: Stuckcoder devteam
// owner: Stuckcoder AS

// MARK: IMPORTS
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('./keys');
const C_user = mongoose.model('c_users');
const S_user = mongoose.model('s_users');

var User = C_user; 


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Convert to switch case?
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        setProperUser(jwt_payload)
        User.findById(jwt_payload.id)
        .then(user => {
            if(user) {
                console.log("passport: SUCCESS")
                return done(null, user);
            }
            console.log("passport: FAIL")
            return done(null, false);
        })
        .catch(err => console.log(err));
    }))
}

function setProperUser(jwt_payload) {
    if(jwt_payload.iscompany == true) {
        User = C_user
    } else {
        User = S_user
    }
}






