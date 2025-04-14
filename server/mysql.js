const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'newdatabase',
  waitForConnections: true, // 无可用连接时等待
  queueLimit: 0             // 无等待队列限制
})

connection.on('error', (err) => {
  console.error('Database connection error:', err);
  // 可以在这里添加重试逻辑或其他错误处理
});
const sqlFn = (sql, arr, callback) => {
  connection.query(sql, arr, callback)
  // connection.query(sql,arr,(err,result)=>{
  //     if(err){
  //         return callback(err)
  //     }
  //     callback(null,result)
  // })
}
module.exports = sqlFn