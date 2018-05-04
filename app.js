var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs")

var campgrounds = [
    {name: "Bruce Peninsula National Park", image:"https://www.pc.gc.ca/en/pn-np/on/bruce/activ/camping/~/media/F4013D7471C244188ED25DE09441984A.ashx?w=416&h=279&as=1"},
    {name: "Algonquin Provincial Park", image:"http://www.algonquinpark.on.ca/images/camping_index.jpg"},
    {name: "Banff National Park", image:"https://www.nationalgeographic.com/content/dam/travel/2016-digital/best-of-the-world-banff/hammock-moraine-lake-banff-national-park.adapt.1900.1.jpg"}
    ]

app.get("/", function(req,res){
    res.render("landing");
})

app.get("/campgrounds", function(req,res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app has started");
})