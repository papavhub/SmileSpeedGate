// client


const { SSL_OP_CIPHER_SERVER_PREFERENCE } = require('constants');
var net = require('net');

var ip = '127.0.0.1';//'192.168.219.107';
var port = 3000;


var socket = new net.Socket();
socket.connect({host:ip, port:port}, function() {
   console.log("서버와 연결 성공");

        var temperature
        var fs = require('fs');

        while (1){
            
            //console.log("//////////");
            var readText = fs.readFileSync('./temp.txt', 'utf8'); // 파일 읽어오기
            sleepFor(1000);
            //if(err) return err;
            console.log(readText);
            temperature = readText;
            socket.write(`${temperature}`);
            //console.log(`${data}`);


        }




        socket.on('data', function(chunk) { // recv
            console.log('서버가 보냄 : ',
            chunk.toString());        
        });

        socket.on('end', function() {
            console.log('서버 연결 종료');
        });
        
    
        

});

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ 
        /* Do nothing */ 
    }
}