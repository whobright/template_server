const mysql  = require('mysql');
const pool = mysql.createPool({
    host     : '104.225.154.189',
    user     : 'root',
    password : 'Hl=123456',
    port: '3306',
    database: 'template'
});
function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;
