// server

var net = require('net');
var server = net.createServer(function(socket) {
    // connection event
    console.log('클라이언트 접속');
    socket.write('Welcome to Socket Server'); // send

    socket.on('data', function(chunk) { // recv
        console.log('클라이언트가 보냄 : ', chunk.toString());
        ras_server(parseFloat(chunk.toString()))

    });
    

    socket.on('end', function() {
        console.log('클라이언트 접속 종료');
    });
});

server.on('listening', function() {
    console.log('Server is listening');
});

server.on('close', function() {
    console.log('Server closed');
});

server.listen(3000);











function ras_server (temp) { //  DB에 저장


    var mysql = require("mysql"); // mysql 모듈을 불러옵니다.

    // 커넥션을 정의합니다.
    // RDS Console 에서 본인이 설정한 값을 입력해주세요.
    var connection = mysql.createConnection({
    host: "database-1.cmncqrwff0ap.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "asdf1234",
    database: "HANIUM1"
    });

var a = "SELECT * FROM TEMP";

// RDS에 접속합니다.
connection.connect(function(err) {
  if (err) {
    throw err; // 접속에 실패하면 에러를 throw 합니다.
  } else {
    // 접속시 쿼리를 보냅니다.
    connection.query('INSERT INTO TEMP (ID, TEMPERATURE) VALUES (?, ?)', ["YGM@kpu.ac.kr", temp], function(err, rows, fields) {
    //connection.query(a, function(err, rows, fields) {
        var spawn = require('child_process').spawn;
        console.log(rows); // 결과를 출력합니다!
      
    });


    // 접속시 쿼리를 보냅니다.
    //connection.query('INSERT INTO ENTRY_RECORD (ID, GATE_NUM, ENTRY_TIME) VALUES (?, ?, ?)', ["CHM@KPU.AC.KR", "4F", "2017-12-01 00:00:01"], function(err, rows, fields) {
        connection.query(a, function(err, rows, fields) {
            var spawn = require('child_process').spawn;
            console.log(rows); // 결과를 출력합니다!
          
        });


  }
});
}