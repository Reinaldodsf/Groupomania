const mysql = require('mysql');

let conDb = mysql.createConnection({
    host: "localhost",
    user: 'root', 
    password: 'openCLASS2020', 
    database: 'groupomania',
});

conDb.connect(function(err) {
    if (err) {
        console.log( err );
    } else {
        console.log('Connected to MySQL Database!')
    }
});

module.exports = conDb;