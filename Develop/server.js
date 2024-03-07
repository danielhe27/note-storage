const express = require('express');
// define our express app
const app = express();
// setting the port that the server will listen on
const PORT = process.env.PORT || 3001;
// app use, serves the public folder as a static directory
app.use(express.static('public'));
// urlencoded middleware to parse incoming requests
app.use (express.urlencoded({ extended: true }));
// json middleware to parse incoming requests and then make it avaliable in the req.body
app.use(express.json());

//routes for api and html
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// this will listen for requests on the port that we set in the PORT variable
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});