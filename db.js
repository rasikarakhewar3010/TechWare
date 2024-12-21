const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',      // The database host (localhost if MySQL is local)
    user: 'root',           // MySQL username
    password: 'ENTER_MYSQL_PASSWORD',  // Your MySQL root password
    database: 'techware_db',  // The database you want to connect to
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.stack);
        return;
    }
    console.log('Connected to the MySQL database as id ' + connection.threadId);
});

module.exports = connection;
