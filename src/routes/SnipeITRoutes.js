var dotenv = require('dotenv').config;
var axios = require('axios');

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
exports.fetchChromebookByAssetTag = async (req, res) => {
    const assetTag = String(req.params.assetTag);
    try {
        const response = await axios.get((HTTP_EXTENSIONS.base + HTTP_EXTENSIONS.hardware + HTTP_EXTENSIONS.ByAssetTag + assetTag), {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'asset_tag': `${assetTag}`,
            },
            params: {
                location: `${HTTP_EXTENSIONS.dailysLocation}`,
            },
        });
        if (response.data) {res.json(response.data);} 
        else {res.status(404).json({ message: 'No Chromebook data found.'});}
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred when fetching Organizational Units.' });
    }
}

exports.checkOutChromebook = async (req, res) => {
    const chromebookID = String(req.param.id);
    // Add a way to get the current date/time
    // Assign date/time to the 'checkout_at' body param

    // Add a way to get the user_id 
    // Assign the user_id to the 'assigned_user' body param
    //    - (Employee number is the same as student id?)

    // Body params:
    // I need:
    //    - a valid 'status_id'
    //    - set the 'checkout_to_type' to "user"
    try {
        await axios.post((HTTP_EXTENSIONS.base + HTTP_EXTENSIONS.hardware + chromebookID + "/checkout"), {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
            }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred when checking out the Chromebook.' });
    }
}