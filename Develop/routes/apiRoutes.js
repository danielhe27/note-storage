// declaring variables and modules
const path = require('path');
const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
//this is the port that the server will listen on
app.use(express.json()); 

// exports our routes
module.exports = (app) => {
// get the notes from the db
  app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/db/db.json'));
});

// this will create a new note and add it to the db
app.post('/api/notes', function (req, res) {
  // read the db file
let db = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/db/db.json')));
// here we are adding the new note to the db with a title, text(content) and an unique id
let newNote = {
  title: req.body.title,
  text: req.body.text,
  id: uuidv4(),
};

// then we are pushing the new note to the db
db.push(newNote);
// and then we are writing the db to the db file
fs.writeFileSync(path.join(__dirname, '../public/db/db.json'), JSON.stringify(db, null, 2));
// sends response with the new note
res.json(newNote); 
});

// this will delete a note from the db and update the db file
app.delete('/api/notes/:id', (req, res) => {
// read the db file from the db folder
let db = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/db/db.json')));

// find the note with the id that we want to delete
let deletedNote = db.find(item => item.id === req.params.id);
// then we are filtering out the note with the id that we want to delete
let updatedNotes = db.filter(item => item.id !== req.params.id);
// and then we update the db file with the new notes
fs.writeFileSync(path.join(__dirname, '../public/db/db.json'), JSON.stringify(updatedNotes, null, 2));
// we send a response with the deleted note
res.json({ message: 'Note deleted successfully', deletedNote });
  })
}
