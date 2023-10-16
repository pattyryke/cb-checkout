const dotenv = require('dotenv');
const { createConnection } = require('mysql2/promise');
const axios = require('axios');

// Connect to MySQL Database
async function addToDatabase(req, res) {
    // Establish a connection to mySQL
    const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'cb_database',
    });

    try {
        const { student_name, student_id, cb_serial_num, cb_asset_tag, cb_full_info, date_checkout } = req.body.data.obj;
        const chromebook = {
            student_name,
            student_id,
            cb_serial_num,
            cb_asset_tag,
            cb_full_info,
            date_checkout,
            date_checkin: null,
            isLocked: false,
            isFeed: false,
            isCompleted: false,
        };

        // Insert the chromebook object into the database
        connection.query('INSERT INTO cb_table_test SET ?', chromebook, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).json({ error: 'Error inserting data into the database.' });
            } else {
                console.log('Data inserted successfully!');
                res.status(200).json({ message: 'Data inserted successfully!' });
            }
        });
    } catch (err) {
        console.error('Error connecting to MySQL database:', err);
        res.status(500).json({ error: 'Error connecting to MySQL database.' });
    }
}

async function checkOutOnSnipeIT(req, res) {
    try {
        const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
        const cbID = req.param.chromebookID;
        const stuID = req.param.stuID;
        const status_id = req.param.statusID;
        console.log("chromebookID:", cbID);
        console.log("studentID:", stuID);
        console.log("statusID:", status_id);

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
                assigned_user: stuID,
            }
        };

        const response = await axios(options);
    } catch (err) {
        console.error('Error when getting id of Chromebook in SnipeIT using the asset tag.', err);
    }
}

module.exports = {
    addToDatabase,
    checkOutOnSnipeIT,
};
