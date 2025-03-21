var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: ''
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
});

conexion.query('SELECT * FROM user', function (error, results, fields) {
    if (error) throw error;
    console.log('sql: ', results[0].username);
});

conexion.end();