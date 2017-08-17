var http = require('http'),
    express = require('express'),
    app = express(),
    config = require('./modules/config'),
    functions = require('./modules/functions'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    cors = require('cors')

var corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'token, content-type'
}
app.use(cors(corsOptions));

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;

db.on('error', () => {
    console.error.bind(console, 'Connection Error : ');
    exit(0)
});
db.once('open', function () {
    console.log('DB Connection ok!');
});

mongoose.Promise = global.Promise;




// The server should start listening
server.listen(process.env.PORT);
console.log('listening on port ', process.env.PORT)

// Register the index route of your app that returns the HTML file
app.get('/', function (req, res) {
    console.log("Homepage");
    res.sendFile(__dirname + '/index.html');
});

//adding the module with the REST endpoints.
app.use('/api', require('./routes/logs'));


/*
    *** You can also add a socker server for saving and retrieving logs, simple code to get started is shown below

    var models = require('./modules/Models');
    var Log = models.Log;


    io.on('connection', function (socket) {
        var connectionId = socket.id;

        io.sockets.connected[connectionId].emit('logs_connected', {
            connectionId
        });
        console.log("Connected succesfully to the socket ...", connectionId);

        socket.on('connection-id', data => {
            io.sockets.connected[connectionId].emit('logs_connected', {
                connectionId
            });
        })

        socket.on('get-logs', data => {
            if(some-condition-of-data){
                Log.find().then(logs=>{
                    if(logs.length>0){
                        io.sockets.connected[connectionId].emit('logs_found', {
                            logs
                        });
                    }else{
                        io.sockets.connected[connectionId].emit('logs_not_found');
                    }
                })
            }else{
                io.sockets.connected[connectionId].emit('condition_not_met', {
                    someErrorData
                });
            }

        })

        socket.on('save-log', data => {
            var newLog = new Log(data);
            newLog.save().then(savedLog=>{
                if(savedLog){
                    io.sockets.connected[connectionId].emit('log_saved', {
                        savedLog
                    });
                }else{
                    io.sockets.connected[connectionId].emit('log_not_saved');
                }
            }).catch(e=>{
                console.log('Error saving Log')
            })
        })
    });

*/