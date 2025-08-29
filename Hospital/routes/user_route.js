var express=require("express");
var exe=require("./../connection");

var router = express.Router();


router.get('/',(req,res)=>{
    res.render('Home.ejs');
})

//Create form Query
// var sql=`CREATE TABLE enquiry_form(enquiry_id int PRIMARY KEY AUTO_INCREMENT,enquiry_name varchar(100),enquiry_email varchar(100),enquiry_mobile varchar(15),enquiry_date DATE)`;
router.post('/apointment',async(req,res)=>{
    var d=req.body;
    var sql=`INSERT INTO enquiry_form(enquiry_name,enquiry_email,enquiry_mobile,enquiry_date)VALUES('${d.enquiry_name}','${d.enquiry_email}','${d.enquiry_mobile}','${d.enquiry_date}')`;
    var data=await exe(sql);
    res.redirect("/")
    console.log(d);
})


//Login Route
router.get("/login",async(req,res)=>{
    res.render("login.ejs");
})


























module.exports=router;
