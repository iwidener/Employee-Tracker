var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: ""
,
database: "employeeTracker_DB"
});
connection.connect(function(err) {
    if (err) throw err;
    start();
});