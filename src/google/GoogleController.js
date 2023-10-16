const axios = require('axios');
const {google} = require('googleapis');
require('dotenv').config();

const admin = google.admin('directory_v1');

const customer_id = process.env.REACT_APP_CUSTOMER_ID;




async function getChromebookID(serial_num) {
    try {
        const response = admin.chromeosdevices.list({
            customerId: customer_id,
            param: {
                serialNumber: serial_num,
            }
        });
        console.log(JSON.stringify(response));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function lockChromebook(serial_num) {
    const customer_id = process.env.REACT_APP_CUSTOMER_ID;
    try {
        const options = {
            method: 'GET',
            url: `https://admin.googleapis.com/admin/directory/v1/customer/${customer_id}/devices/mobile`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const response = await axios(options);
        console.log(response);
        return response;
    } catch (err) {
        console.error(`Error while attempting to lock the Chromebook: ${err}`);
    }
}

module.exports = {
    getChromebookID,
    lockChromebook,
};
