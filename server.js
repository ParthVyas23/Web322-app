var service = require('./data-service.js')
var express = require("express");
var app = express();
var path = require("path");
var HTTP_PORT = process.env.PORT || 8080;

// setting up default route
app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

// setting up route for /about
app.get("/about", function(req,res) {
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

// route for intlstudents
app.get("/intlstudents", function(req,res) {
    service.getInternationalStudents()
    .then(function(value) {
        res.json(value);
    })
    .catch(function(err) {
        res.json({message: err});
    });
    
});

// route for students
app.get("/students", function(req,res) {
    service.getAllStudents()
    .then(function(value) {
        res.json(value);
    })
    .catch(function(err) {
        res.json({message: err});
    });
});

// route for programs
app.get("/programs", function(req,res) {
    service.getPrograms()
    .then(function(value) {
        res.json(value);
    })
    .catch(function(err) {
        res.json({message: err});
    });
});


//css
app.use(express.static('public'));

// 404 error message
app.use(function(req,res,next) {
    res.status(404).send('Page not found, yo. 404');
});

// setup listen
service.initialize()
.then(function(msg) {
    console.log(msg);
    app.listen(HTTP_PORT);
})
.catch(function(err) {
    console.log(err);
});