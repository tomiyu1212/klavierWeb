const mysql = require ('mysql');

// Connection Pool
const pool = mysql.createPool ({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

exports.view = (req, res) => {
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        // User the connection
        connection.query('SELECT Title, URL FROM klavierprograms WHERE id = (SELECT MAX(id) FROM klavierprograms)', (err, rows) => {
            // When done with the connection, release it
            connection.release ();
            if (!err) {
                res.render ('top', {rows});
            }
            else {
                console.log(err);
            }

            console.log ('The data from user table: \n', rows);
        });
    });
};