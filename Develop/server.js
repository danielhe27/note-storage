const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

const allNotes = require('../db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Develop/public'));


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(allNotes);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

function createNewNote(body, notesArray) {
  if (!Array.isArray(notesArray)) {
    notesArray = [];
  }

  if (notesArray.length === 0) {
    notesArray.push({ counter: 0 });
  }

  body.id = notesArray[0].counter;
  notesArray[0].counter++;
  
  notesArray.push(body);
  fs.writeFileSync('../db/db.json', JSON.stringify(notesArray, null, 2));

  return body;
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});