var fs = require('fs');

exports.readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonArray = JSON.parse(data);
    return jsonArray;
  } catch (err) {
    console.error('Error reading or parsing JSON file:', err);
    return null;
  }
};


exports.getStudentNameById = (req, res) => {
    const inputFile = './src/routes/assets/students.json';
    const studentId = req.params.studentId;
    const jsonArray = exports.readJSONFile(inputFile);
    
    if (jsonArray) {
        const result = jsonArray.find(obj => obj.studentId === studentId);
        if (result) {
          const { studentId, firstName, lastName } = result;
          const fullName = `${firstName} ${lastName}`;
    
          res.send(fullName);
        } else {
          res.status(404).send(`Student with ID ${studentId} not found.`);
        }
    } else {
        res.status(500).send('Error reading JSON file.'); 
    }
};