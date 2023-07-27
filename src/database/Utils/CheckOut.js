const mysql = require('mysql2/promise');

// Connect to MySQL Database
exports.addToDatabase = async (req, res) => {
    // Establish a connection to mySQL
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'cb_database',
    });
    
    try {
      const { student_name, student_id, cb_serial_num, cb_asset_tag, cb_full_info, date_checkout } = req.body.obj;
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
          res.status(500).json({ error: 'Error inserting data into database.' });
        } else {
          console.log('Data inserted successfully!');
          res.status(200).json({ message: 'Data inserted successfully!' });
        }
      });
    } catch (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).json({ error: 'Error connecting to MySQL database.' });
    }
};

exports.checkOutOnSnipeIT = async (req, res) => {
  const tag = req.params.tag;
  const student_id = req.params.student_id;
  try {
    const response = axios.get(`https://develop.snipeitapp.com/api/v1/hardware/bytag/${tag}`);
    console.log(response.data);
  } catch (err) {
    console.error('Error when getting id of Chromebook in SnipeIT using the asset tag.')
  }
};