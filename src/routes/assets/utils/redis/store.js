const   Promise             = require('promise'),
        storePromisified    = require('./storePromisified'),
        storeOp             = require('./storeUtils').storeOp,
        storeMsg            = require('./storeUtils').storeMsg,
        storeStatus         = require('./storeUtils').storeStatus;


const redisDB = {
    findUser: async function(id) {
        try {
            const res = await storePromisified.getall(id);
            if (res) {
                return (storeStatus(storeOp.FIND_USER, true, res));
            }
            else {
                return (storeStatus(storeOp.FIND_USER, false, storeMsg.USER_NOT_EXIST));
            }
        } catch {
            throw (storeStatus(storeOp.FIND_USER, false, storeMsg.DB_FAILED));
        }
    },

    existUser: async function(id) {
        try {
            const res = await storePromisified.exists(id);
            if (res.replace(/"/g, '') === 1) {
                console.log(`USER EXISTS`);
                return (storeStatus(storeOp.EXIST_USER, true, storeMsg.USER_EXIST));
            }
            else {
                return (storeStatus(storeOp.EXIST_USER, false, storeMsg.USER_NOT_EXIST));
            }
        } catch (err) {
            throw (storeStatus(storeOp.EXIST_USER, false, storeMsg.DB_FAILED)); 
        }
    },

    makeUser: async function(id, email, token, name, pictureURL) {
        try {
            console.log(`store.js: Setting creds...`);
            const res = await storePromisified.set(id, {
                'google-id': id,
                'google-email': email,
                'google-name': name,
                'google-token': token,
                'google-picture': pictureURL
            });
            console.log(`store.js: res = ${res}`);
            if (res.replace(/"/g, '') === "OK") {
                console.log(`store.js: TRUE!`);
                return (storeStatus(storeOp.ADD_USER, true, storeMsg.USER_MADE));
            }
            else {
                return (storeStatus(storeOp.ADD_USER, false, storeMsg.USER_NOT_MADE));
            }
        } catch (err) {
            throw storeStatus(storeOp.ADD_USER, false, storeMsg.DB_FAILED);
        }
    },

    renewToken: async function(id, token) {
        try {
            const tokenObj = {'google-token': token};
            const res = await storePromisified.set(id, tokenObj);

            if (res.replace(/"/g, '') === "OK") {
                return (storeStatus(storeOp.RENEW_TOKEN, true, storeMsg.TOKEN_RENEWED));
            } else {
                return (storeStatus(storeOp.RENEW_TOKEN, false, storeMsg.TOKEN_NOT_RENEWED));
            }
        } catch (err) {
            throw storeStatus(storeOp.RENEW_TOKEN, false, storeMsg.DB_FAILED);
        }
    }
};

module.exports = redisDB;