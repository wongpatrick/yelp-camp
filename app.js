var express = require("express"),
    app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs")

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {   name: "Banff National Park", image:"https://www.nationalgeographic.com/content/dam/travel/2016-digital/best-of-the-world-banff/hammock-moraine-lake-banff-national-park.adapt.1900.1.jpg",
        description: "Banff National Park is Canada's oldest national park and was established in 1885. Located in the Rocky Mountains, 110–180 kilometres west of Calgary in the province of Alberta."
        
    }, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    })*/

app.get("/", function(req,res){
    res.render("landing");
})

app.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
       if (err) {
           console.log(err);
       } else {
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
    
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs"); 
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
       if (err) {
           console.log(err);
       } else {
            res.render("show", {campground: foundCampground});
       }
    });
   
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app has started");
})