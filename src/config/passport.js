require('dotenv').config();
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Promise = require('promise');
var client = require('./client.cjs');
// var store = require('../routes/assets/utils/redis/store');
var storeMsg = require('../routes/assets/utils/redis/storeUtils').storeMsg;

var client_id = process.env.REACT_APP_CLIENT_ID;
var client_secret = process.env.REACT_APP_CLIENT_SECRET;
var redirect_uri = process.env.REACT_APP_REDIRECT_URI;

const store = {
    find: async (id) => {
        client.hgetall(id, (err, value) => {
            if (err) {
                console.log(`No user found with id: ${id}`);
            } else {
                return value;
            }
        })
    },
    exists: (id) => {

    },
    make: async (id, email, token, name, picURL) => {
        const user = {
            id: id,
            email: email,
            token: token,
            name: name,
            picURL: picURL
        };
        await client.hSet(user.id, user, (err, value) => {
            if (err) {
                console.log("Failed to make user.");
            } else {
                console.log("Successfully made user.");
            }
        });
    },
    renew: (id, token) => {

    }
};


var passportConfig = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({   
            clientID: client_id,
            clientSecret: client_secret,
            callbackURL: `http://localhost:3000/auth/google/callback`,
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, done) => {
            // User not found
            if (!req.user) {
                console.log(`NO REQ.USER FOUND`);
                console.log(`id = ${profile["id"]}`);
                console.log(`email = ${profile["emails"][0]["value"]}`);
                console.log(`name = ${profile["displayName"]}`);
                console.log(`picURL = ${profile["photos"][0]["value"]}`);
                console.log(`accessToken = ${accessToken}`);
                process.nextTick(() => {
                    var userObj = {
                        id: profile["id"],
                        email: profile["emails"][0]["value"],
                        name: profile["displayName"],
                        picture: profile["photos"][0]["value"],
                        access: accessToken,
                    };
                    return done(null, userObj);
                });
            }
            // User Found
            else {
                console.log(`REQ.USER FOUND`);
                console.log(`id = ${profile["id"]}`);
                console.log(`email = ${profile["emails"][0]["value"]}`);
                console.log(`name = ${profile["displayName"]}`);
                console.log(`picURL = ${profile["photos"][0]["value"]}`);
                console.log(`accessToken = ${accessToken}`);
                process.nextTick(() => {
                    var userObj = {
                        id: profile["id"],
                        email: profile["emails"][0]["value"],
                        name: profile["displayName"],
                        picture: profile["photos"][0]["value"],
                        access: accessToken,
                    };
                    console.log(`userObj = ${userObj}`);
                });
            }
        }
    ));
};
module.exports = passportConfig;

//     passport.serializeUser((user, done) => {
//         console.log(`passport.js: THIS IS THE USER IN SERIALIZEUSER() = ${user}`);
//         return done(null, user['google-id']);
//     });

//     passport.deserializeUser(async (id, done) => {
//         try {
//             const res = await store.findUser(id);
//             // console.log(`passport.js: res.msg from deserializeUser() = ${JSON.stringify(res.msg)}`);
//             if (res.msg !== storeMsg.USER_NOT_EXIST) {
//                 return done(null, res.msg);
//             } else {
//                 return done(null, false);
//             }
//         } catch (err) {
//             return done(err);
//         }
//     });

//     passport.use(
//         new GoogleStrategy(
//             {
//                 clientID: client_id,
//                 clientSecret: client_secret,
//                 callbackURL: `http://localhost:3000/auth/google/callback`,
//                 passReqToCallback: true
//             },
//             async (req, accessToken, refreshToken, profile, done) => {
//                 process.nextTick(async function () {
//                     if (!req.user) {
//                         console.log(`passport.js: Could not find stored user.`);
//                         try {
//                             console.log(`passport.js: Finding user by id...`);
//                             const res_find = await store.findUser(profile.id);

//                             if (res_find.msg !== storeMsg.USER_NOT_EXIST) {
//                                 console.log(`passport.js: Found user.`);
//                                 const res_make = await store.makeUser(
//                                     profile.id,
//                                     accessToken,
//                                     profile.emails[0].value.toLowerCase(),
//                                     profile.displayName,
//                                     profile.photos[0].value
//                                 );

//                                 console.log(`passport.js: Made user using profile variable.`);
//                                 if (res_make.success && res_make.msg === storeMsg.USER_MADE) {
//                                     console.log(`passport.js: Finding user by id...`);
//                                     const res_find = await store.findUser(profile.id);
//                                     if (res_find.msg !== storeMsg.USER_NOT_EXIST) {
//                                         console.log(`passport.js: Found user.`);
//                                         return done(null, res_find.msg);
//                                     }
//                                 } else {
//                                     console.log(`Error making user: ${res_make.msg}`);
//                                     return done(res_make.msg);
//                                 }
//                             } else {
//                                 console.log(`passport.js: Could not find user using profile variable`);

//                                 const res_make = await store.makeUser(
//                                     profile.id,
//                                     accessToken,
//                                     profile.emails[0].value.toLowerCase(),
//                                     profile.displayName,
//                                     profile.photos[0].value
//                                 );

//                                 if (res_make.success && res_make.msg === storeMsg.USER_MADE) {
//                                     console.log(`passport.js: Created new user using profile variable`);

//                                     console.log(`passport.js: Finding user by id... ${profile.id}`);
//                                     const res_find = await store.findUser(profile.id);
//                                     if (res_find.msg !== storeMsg.USER_NOT_EXIST) {
//                                         console.log(`passport.js: Found user.`);
//                                         return done(null, res_find.msg);
//                                     } else {
//                                         return done(res_make.msg);
//                                     }
//                                 } else {
//                                     return done(res_make.msg);
//                                 }
//                             }
//                         } catch (err) {
//                             throw Error(`Error in passport.js ${err}`);
//                         }
//                     }
//                 });
//             }
//         )
//     );
// };
// module.exports = passportConfig;