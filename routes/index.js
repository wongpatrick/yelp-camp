var express= require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

router.get("/", function(req,res){
    res.render("landing");
});


// AUTH Routes
// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

router.post("/register", function(req,res){
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        email: req.body.email
    });
    if (req.body.code === 'secretcode123') {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            req.flash("error", err.message);
            res.redirect("register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),function(req,res){
});

// Logout Route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

// USER PROFILES
router.get("/users/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
       if (err) {
           req.flash("error", "Something went wrong");
           res.redirect("/");
       }
       Campground.find().where('author.id').equals(foundUser._id).exec(function(err,campgrounds){
           if (err) {
                req.flash("error", "Something went wrong");
                res.redirect("/");
           }
           res.render("users/show", {user: foundUser, campgrounds: campgrounds});
       });
       
    });
});


module.exports = router;