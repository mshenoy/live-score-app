var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'livescores'
});

server.listen(3000);

connection.connect((error) =>{
  if (!!error) {
    console.log('Error');
  }else {
    console.log('Connected');
  }
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/styles.css', function (req, res) {
  res.sendFile(__dirname + '/styles.css');
});

app.get('/update', function (req, res) {
  res.sendFile(__dirname + '/updateScore.html');
});

app.get('/main', function (req, res) {
  res.sendFile(__dirname + '/main.html');
});


io.on('connection', function (client) {
  console.log('Client connected...');

    //Getting data from browser from browser
    client.on('join', function(data) {
        console.log(data);
    });

    client.on('scoreUpdate', function(data) {
           client.emit('getLiveScore', data);
           client.broadcast.emit('getLiveScore',data);
    });

  client.on('test', function(data){
    console.log(data);
  });
});
