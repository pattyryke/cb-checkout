const { createConnection } = require('mysql2/promise');

/** 
 *  ANY INCOMPLETE CHROMEBOOK CHECKOUTS
 */
async function displayTable(req, res) {
    const condition = req.query.display;
    const query = `SELECT * FROM cb_table_test ${condition}`;
    const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'cb_database',
    });

    try {
        const rows = await connection.query(query);
        res.send(rows);
        res.status(200);
    } catch (err) {
        console.error('Error executing database query:', err);
        res.status(500).json({ error: 'Error executing database query.' });
    }
}

module.exports = {
    displayTable,
};
