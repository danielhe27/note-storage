const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Change uniqueId to uuidv4
const { json } = require('express');

module.exports = (app) => {
  app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  app.post('/api/notes', function (req, res) {
    let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(), // Change uniqueId() to uuidv4()
    };

    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
  });
};
