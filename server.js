var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
const mongoose = require("mongoose");

var PORT = process.env.PORT || 3001;

var app = express();
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 36000000 } }));

// Serve static content for the app from the "public" directory in the application directory.
app.use('/', express.static(path.join(__dirname+"/public")));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes and give the server access to them.
var routes = require("./routes/api/auth_controller.js");
app.use(routes);
var routes1 = require("./routes/api/movie_controller.js");
app.use(routes1);
var routes3 = require("./routes/api/shareable_link_controller.js");
app.use(routes3);



if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/movies");

app.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
});
