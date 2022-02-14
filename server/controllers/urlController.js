const mysql = require ('mysql');

// Connection Pool
const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.view = (req, res) => {
    
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        // User the connection
        connection.query('SELECT * FROM klavierprograms', (err, rows) => {
            // When done with the connection, release it
            connection.release ();
            if (!err) {
                res.render ('edit', {rows});
            }
            else {
                console.log(err);
            }

            console.log ('The data from user table: \n', rows);
        });
    });
    
};

exports.form = (req, res) => {
    res.render ('addPrograms');
};

exports.create = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        let title = req.body.title;
        let url = req.body.url

        connection.query('ALTER TABLE klavierprograms AUTO_INCREMENT = 1', (err, rows) => {
            // When done with the connection, release it
            connection.release ();
            if (err) console.log(err);

            console.log ('The data from user table: \n', rows);
        });
        // User the connection
        var date = new Date();
        var year = date.getFullYear();

        connection.query('INSERT INTO klavierprograms SET Title = ?, URL = ?, YEAR = ?', [title, url, year], (err, rows) => {
            // When done with the connection, release it
            if (!err) {
                res.render ('addPrograms', {alert: '成功しました!!'});
            }
            else {
                console.log(err);
            }
            console.log ('The data from user table: \n', rows);
        });
    });
};

exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);


        // User the connection
        connection.query('SELECT * FROM klavierprograms WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release ();
            if (!err) {
                res.render ('editPrograms', {rows});
            }
            else {
                console.log(err);
            }

            console.log ('The data from user table: \n', rows);
        });
    });
};

exports.update = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        let title = req.body.title;
        let url = req.body.url
            // User the connection

        // User the connection
        connection.query('UPDATE klavierprograms SET Title = ?, URL = ? WHERE id = ?', [title, url, req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release ();
            if (!err) {

                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    console.log('Connected as ID' + connection.threadId);
            
            
                    // User the connection
                    connection.query('SELECT * FROM klavierprograms WHERE id = ?', [req.params.id], (err, rows) => {
                        // When done with the connection, release it
                        if (!err) {
                            res.render ('editPrograms', {rows, alert: '成功しました!!'});
                        }
                        else {
                            console.log(err);
                        }
            
                        console.log ('The data from user table: \n', rows);
                    });
                });
            }
            else {
                console.log(err);
            }

            console.log ('The data from user table: \n', rows);
        });
    });
};

exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);


        // User the connection
        connection.query('DELETE FROM klavierprograms WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release ();
            if (!err) {
                res.redirect ('/edit');
            }
            else {
                console.log(err);
            }

            console.log ('The data from user table: \n', rows);
        });
    });
};

exports.passView = (req, res) => {
    res.render ('editPass');
}

exports.pass = (req, res) => {
    let pass = req.body.pass;

    if (pass === process.env.KLAVIER_PASS) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log('Connected as ID' + connection.threadId);
    
            // User the connection
            connection.query('SELECT * FROM klavierprograms', (err, rows) => {
                // When done with the connection, release it
                connection.release ();
                if (!err) {
                    res.render ('edit', {rows});
                }
                else {
                    console.log(err);
                }
    
                console.log ('The data from user table: \n', rows);
            });
        });        
    }
    else {
        res.render('editPass', {alert: 'パスワードが間違っています'});
    }

};

exports.viewPrograms = (req, res) => {
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        // User the connection
        connection.query('SELECT * FROM klavierprograms WHERE YEAR = ?', [req.params.year], (err, rows) => {
            // When done with the connection, release it
            connection.release ();
            if (!err) {
                res.render ('programs', {rows});
            }
            else {
                console.log(err);
            }
    
            console.log ('The data from user table: \n', rows);
        });
    });

};

exports.year = (req, res) => {
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        // User the connection
        connection.query('select distinct YEAR from klavierprograms', (err, rows) => {
            // When done with the connection, release it
            connection.release ();
            if (!err) {
                res.render ('year', {rows});
            }
            else {
                console.log(err);
            }

            console.log ('The data from user table: \n', rows);
        });
    });
};