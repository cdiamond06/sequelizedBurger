var path = require("path");

// Routes

module.exports = function(app){

	app.get('/', function(req, res){
		res.sendFile(path.join(_dirname + "/../views/index.handlebars"));
	})
}