const { Redis } = require('ioredis');

const client = new Redis()
const DEFAULT_EXPIRATION = 3600;


const setGoogleUser = async (userObj) => {
    try {
        await client.hmset('currentGoogleUser', userObj);
        console.log('Set currentGoogleUser.')
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const getGoogleUser = async () => {
    try {
        const userObj = await client.hgetall('currentGoogleUser');
        return userObj;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const delGoogleUser = async () => {
    try {
        await client.del('currentGoogleUser');
        console.log('Deleted currentGoogleUser.');
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    setGoogleUser,
    getGoogleUser,
    delGoogleUser,
}