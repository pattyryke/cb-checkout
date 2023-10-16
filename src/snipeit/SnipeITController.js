const axios = require('axios');
const { config } = require('dotenv');
config();

async function getDailyChromebooks(req, res) {
    const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
    const options = {
        method: 'GET',
        url: `https://fwusd.snipe-it.io/api/v1/hardware?limit=2&offset=0&sort=created_at&order=desc&rtd_location_id=16&status=Deployed`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    };

    try {
        const response = await axios(options);
        res.send(response.data);
    } catch (error) {
        console.error("Error getting Daily Chromebooks:", error);
        throw error;
    }
}

async function getUser(req, res) {
    try {
        const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
        const id = req.params.studentID;
        const options = {
            method: 'GET',
            url: `https://fwusd.snipe-it.io/api/v1/users`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            params: {
                employee_num: id,
            },
        };
        const response = await axios(options);
        if (response.data) {
            res.send(response.data);
        }
    } catch (error) {
        console.error("Error in getUser:", error);
    }
}

async function CheckOutChromebook(req, res) {
    try {
        const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
        console.log(req.body);
        const cbID = req.body.cbID;
        const cbStatusID = req.body.status_id;
        const options = {
            method: 'POST',
            url: `https://fwusd.snipe-it.io/api/v1/hardware/${cbID}/checkin`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            data: {
                status_id: cbStatusID
            },
        };
        const response = await axios(options);
        if (response.data) {
            res.status(200).send('Successfully checked-in the chromebook!');
        }
    } catch (error) {
        console.error("Error in CheckOutChromebook:", error);
        res.status(400).send(`Error in CheckOutChromebook.`);
    }
}

module.exports = {
    getDailyChromebooks,
    getUser,
    CheckOutChromebook,
};
