const mysql = require('mysql2/promise');



exports.modifyRow = async (req, res) => {
    const tag = req.body.cb_asset_tag;
    const date_checkin = req.body.date_checkin;

    const setCheckInDate = (con, checkInDate, tag) => {
        const sql = `UPDATE cb_table_test SET date_checkin = ? WHERE cb_asset_tag = ?`;
        const data = [checkInDate, tag];

        con.query(sql, data, (err, results) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).json({ error: 'Error updating data in the database.' });
            } else {
                console.log('Data updated successfully!');
                res.status(200).json({ message: 'Data updated successfully!' });
            }
            res.send(results);
        });
    };
    const setComplete = (con, tag) => {
        const sql = `UPDATE cb_table_test SET isCompleted = ? WHERE cb_asset_tag = ?`;
        const data = [1, tag];
        
        con.query(sql, data, (err, results) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).json({ error: 'Error updating data in the database.' });
            } else {
                console.log('Data updated successfully!');
                res.status(200).json({ message: 'Data updated successfully!' });
            }
            res.send(results);
        });
    };
  
    try {
      // Establish a connection to MySQL
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'cb_database',
      });
      setCheckInDate(connection, date_checkin, tag);
      setComplete(connection, tag);
    } catch (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Error connecting to MySQL database.' });
    }
  };