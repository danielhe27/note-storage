const path = require('path');
const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json()); // Add this line to parse JSON in the request body

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/db/db.json'));
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

    res.json(newNote); // Send the created note as a response
  });

  app.delete('/api/notes/:id', (req, res) => {
    let db = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/db/db.json')));

    // Removing the note with the specified id
    let deletedNote = db.find(item => item.id === req.params.id);
    let updatedNotes = db.filter(item => item.id !== req.params.id);

    // Updating the 'db.json' file with the modified notes
    fs.writeFileSync(path.join(__dirname, '../public/db/db.json'), JSON.stringify(updatedNotes, null, 2));

    res.json({ message: 'Note deleted successfully', deletedNote });
  })
}
