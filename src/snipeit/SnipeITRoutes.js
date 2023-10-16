const dotenv = require('dotenv').config();
const axios = require('axios');

var HTTP_EXTENSIONS = {
    base: 'https://fwusd.snipe-it.io/api/v1/',
    hardware: 'hardware/',
    BySerial: 'byserial/',
    ByAssetTag: 'bytag/',
    locations: 'locations/',
    dailysLocation: 'HS Daily Chromebooks',
}

const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;

// Grabs all the information about the Chromebook using their Asset Tag #.
// app.get('/chromebook/:assetTag', snipeit_routes.fetchChromebookByAssetTag;
async function fetchChromebookByAssetTag(req, res) {
    try {
        const assetTag = String(req.params.assetTag);
        const options = {
            method: 'GET',
            url: (HTTP_EXTENSIONS.base + HTTP_EXTENSIONS.hardware + HTTP_EXTENSIONS.ByAssetTag + assetTag),
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            params: { location: `${HTTP_EXTENSIONS.dailysLocation}` },
        };

        const response = await axios(options);
        console.log(JSON.stringify(response.data));
        if (response) { res.send(response.data); }
    } 
    catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'An error occurred when fetching Organizational Units.' });
    }
}

// app.post('/chromebook/assign/:assetTag/:studentID', snipeit_routes.checkOutChromebook);
async function checkOutChromebook(req, res) {
    try {
        const userID = req.body.userID;
        const status_id = req.body.statusID;
        const cbID = req.body.cbID;
        const options = {
            method: 'POST',
            url: `https://fwusd.snipe-it.io/api/v1/hardware/${cbID}/checkout`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            data: {
                status_id: status_id,
                checkout_to_type: 'user',
                assigned_user: userID,
            }
        };
        const response = await axios(options);
        if (response.data) {
            console.log(`RESPONSE.DATA: ${JSON.stringify(response.data)}`);
            res.status(400).json({ message: "Successfully checked out the Chromebook!" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred when checking out the Chromebook.' });
    }
}

module.exports = {
    fetchChromebookByAssetTag,
    checkOutChromebook,
};
