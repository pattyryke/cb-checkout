const mysql = require('mysql2/promise');
const axios = require('axios');
const {GoogleAuth} = require('google-auth-library');
require('dotenv').config();


exports.requestAuth = async (req, res) => {
    const serial = String(req.params.serial);
    const url = `http://localhost:3001/google/lock/${serial}`;
    const targetAudience = 'http://localhost:3001/';
    const auth = new GoogleAuth();

    try {
        console.info(`request ${url} with target audience ${targetAudience}`);
        const client = await auth.getIdTokenClient(targetAudience);
        const res = await client.request({url});
        console.info(res.data);
    } catch (err) {
        console.error(err.message);
        process.exitCode = 1;
    }
    
};

exports.lockChromebook = async (req, res) => {
    const { accessToken, refreshToken } = req.user;

    const serial = req.params.serial;
    const customer_id = process.env.REACT_APP_CUSTOMER_ID;
    const url = `https://admin.googleapis.com/admin/directory/v1/customer/${customer_id}/devices/mobile`;
    const params = {
        serial: serial,
    }
    try {
        const response = await axios.get(url, {params});
        console.log(response);
    } catch (err) {
        console.error(`Error while attempting to lock the Chromebook: ${err}`);
    }
};
