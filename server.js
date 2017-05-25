// sets up variable for express
var express = require("express");
// allows you to format req from user
var bodyParser = require("body-parser"); 
var methodOverride = require("method-override");


var port = process.env.PORT || 3000;
// assigns an instances of express
var app = express();

var db = require("./models");
// serves static content for the app from public directory
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({extended:false}));
// override with POST having a ?_method=PUT
app.use(methodOverride("_method"));
app.use(bodyParser.text());

var exphbs = require("express-handlebars");
// the default layout will be in main
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// connects the routes in this variable
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// app.use('/', routes);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});