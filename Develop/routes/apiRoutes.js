const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Change uniqueId to uuidv4


module.exports = (app) => {
  app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  app.post('/api/notes', function (req, res) {
    let db = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/db/db.json')));

    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(), 
    };

    db.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../public/db/db.json'), JSON.stringify(db, null, 2));

    res.json();
  });
};
