const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"your_password",
    database:"arnold_tech_store"
});
db.connect((err)=>{
    if (err){
        console.error("Database connection failed:",err.message);
        return;
    }
    console.log("connected to MYSQL database: arnold_tech_store");
});

module.exports = db;