const mysql = require('mysql2');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  const queryObject = url.parse(req.url, true).query;
  const username = queryObject.user;
  const password = queryObject.pass;

  const connection = mysql.createConnection({
    host: '192.168.0.3',
    user: username,
    password: password,
    database: 'zikan'
  });

  connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.message);
      res.end('エラー,' + err.message);
      return;
    }

    const sql = "SELECT * FROM ??";

    connection.query(sql, [username], (err, results, fields) => {
        if (err) {
            console.error('error querying: ' + err.stack);
            res.write('エラー,' + err.message);
            return;
        }

        results.forEach((row) => {
            res.write(
                `${row.月曜日},${row.火曜日},${row.水曜日},${row.木曜日},${row.金曜日},`
              );
        });

        connection.end();
        res.end();
    });
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});