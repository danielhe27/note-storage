const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('Develop/public'));

app.use (express.urlencoded({ extended: true }));

app.use(express.json());

require('../Develop/api/notes')(app);
require('../Develop/api/htmlRoutes')(app);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});