const { createConnection } = require('mysql2/promise');

async function connect() {
    try {
        await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'cb_database',
        });
    } catch (err) {
        console.error(`An error occurred when connecting to database: ${err}`);
    }
}

async function getSerial(req, res) {
    const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'cb_database',
    });
    const tag = req.params.tag;
    const sql = `SELECT cb_serial_num 
                FROM cb_table_test 
                WHERE cb_asset_tag = ? AND isCompleted = ?`;
    const args = [tag, 0];
    try {
        connection.query(sql, args, (error, results, fields) => {
            if (error) {
                res.status(404).json({ message: 'No Chromebook data found.' });
            }
            console.log(results);
            res.send(results);
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred when fetching serial number from mySQL database.' })
    }
}

async function getAllIncomplete(req, res) {
    const sql = `SELECT *
                FROM cb_table_test
                WHERE isCompleted = ?`;
    const args = [0];
    const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'cb_database',
    });
    try {
        const response = await connection.query(sql, args);
        const list = response[0];
        res.send(list);
        res.status(200);
    } catch (err) {
        console.error('Error executing database query:', err);
        res.status(500).json({ error: 'Error executing database query.' });
    }
}

module.exports = {
    connect,
    getSerial,
    getAllIncomplete,
};
