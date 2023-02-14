const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ckrishnaveni",
    database:"db",
});

app.get("/api/search",(req,res) => {
    const sqlSelect = "SELECT res FROM resp WHERE msg = ?;"
    db.query(sqlSelect, (err, result)=> {
       console.log(result);
    })
})
app.listen(3001,() => {
    console.log("running on port 3001");
})