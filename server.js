var express = require("express");
var app = express();
var port = 2400;
var fileuploader = require("express-fileupload");
var cloudinary = require("cloudinary").v2;
require('dotenv').config();
let aiven = process.env.dbconfig;

var mysql2 = require("mysql2");

app.listen(port, function () {
    console.log("Server Started at Port no: 2400");
})


app.use(express.static("public"));

app.get("/", function (req, resp) {
    console.log(__dirname);
    console.log(__filename);

    let path = __dirname + "/index.html";
    resp.sendFile(path);
})


app.use(express.urlencoded(true));
app.use(express.json());
app.use(fileuploader());

let dbConfig = aiven;

let mySqlVen = mysql2.createConnection(dbConfig);

mySqlVen.connect(function (errKuch) {
    if (errKuch == null)
        console.log("AiVen Connnected Successfully");
    else
        console.log(errKuch.message);
})

app.post("/signup",function(req,resp){
    let txtEmail = req.body.email;
    let txtName = req.body.name;
    let txtPass = req.body.password;

    console.log(txtEmail);

    mySqlVen.query("insert into signup values(?,?,?,current_date(),1)", [txtEmail, txtName,txtPass], function (errKuch) {

        if (errKuch == null)
                resp.send("signedup successfully");
            else
                console.log(errKuch.message);
            })


    })


app.post("/login", function(req, resp){
    const txtEmail = req.body.email;
    const txtPass = req.body.password;

    mySqlVen.query(
        "SELECT * FROM signup WHERE txtEmail = ? AND txtPass = ? AND status = ?",
        [txtEmail, txtPass, 1],
        function(err, allRecords) {

            if(!allRecords || allRecords.length === 0) {
                return resp.send("Invalid");
            }

            resp.send("valid");
        }
    );
});

app.post("/Post_item",function(req,resp){
    let itemName = req.body.itemName;
    let date = req.body.date;
    let location = req.body.location;
    let contact = req.body.contact;
    let otherinfo = req.body.otherinfo;
    let time = req.body.time;

        mySqlVen.query("insert into postItem values(?,?,?,?,?,?)", [itemName,date,time,location,contact,otherinfo], function (errKuch) {

        if (errKuch == null)
                resp.send("post successfull");
            else
                console.log(errKuch.message);
            })

})



// emailid: $("#emailid").val(),
//                         itemname: $("#itemname").val(),
//                         date: $("#date").val(),
//                         location: $("#location").val(),
//                         time: $("#time").val(),
//                         contact: $("#contact").val(),
//                         otherinfo: $("#otherinfo").val(),

