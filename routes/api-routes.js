
var db = require("../models");

module.exports = function(app){

	  // GET route for getting all of the posts
  app.get("/", function(req, res) {
    db.burgers.findAll({})
    .then(function(data) {
      var noteaten = {burg: data}
      console.log("----------" , noteaten);
      res.render("index", noteaten);
    });
  });

  app.post("/", function(req, res){
  	console.log("this is working");
  	console.log("req body ", req.body);
  	db.burgers.create({
  		burger_name: req.body.burger_name,
  		devoured: req.body.devoured
  	})
  	.then(function(data){
  		console.log("=======" + data);
  		res.redirect("/");
  	})
  })

  app.put("/:id", function(req, res){
  	db.burgers.update({devoured:true},
  		{
  		where: {
  				id: req.params.id
  			}
  	}).then(function(data){
  		res.redirect('/');
  	});
  });

};