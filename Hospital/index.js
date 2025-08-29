var express=require("express");
var bodyparser = require("body-parser");
var upload= require("express-fileupload");
var session = require("express-session");
var user_router = require("./routes/user_route");
var admin_router = require("./routes/admin_route");

var app=express();

//Middlewares
app.use(express.static("public/"))
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(session({
    secret:"yogi",
    saveUninitialized: true,
    resave:true,
}));

//User URL //route is also middleware
app.use(user_router);
// app.use("/admin",admin_router);



app.listen(2000);
