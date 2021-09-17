var mysql = require("mysql"); // mysql 모듈을 불러옵니다.

// 커넥션을 정의합니다.
// RDS Console 에서 본인이 설정한 값을 입력해주세요.
var connection = mysql.createConnection({
    host: "database-1.cmncqrwff0ap.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "asdf1234",
    database: "HANIUM1"
});

var a = "SELECT * FROM ENTRY_RECORD";

// RDS에 접속합니다.
connection.connect(function(err) {
if (err) {
    throw err; // 접속에 실패하면 에러를 throw 합니다.
} else {
// 접속시 쿼리를 보냅니다.
//connection.query('INSERT INTO ENTRY_RECORD (ID, GATE_NUM, ENTRY_TIME) VALUES (?, ?, ?)', ["PJY@KPU.AC.KR", "3F", "2017-12-01 00:00:01"], function(err, rows, fields) {
    connection.query(a, function(err, rows, fields) {

    console.log(rows); // 결과를 출력합니다!
});
}
});