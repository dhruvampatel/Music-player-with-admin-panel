const express = require('express');
const musicFactory = require('./musicFactory');
const bodyParser = require('body-parser');
const app = express();
const httpServer = require("http").Server(app);
const io = require('socket.io')(httpServer);
const {connect} = require('./database/db');
const Socket = require('./model/socket');
const Download = require('./model/download');
const socket = require('./model/socket');

const PORT = 3000;

connect();

//Configuring to use static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('node_modules'));

const makeSocketEntry = (socketId, type) => {
    const sock = new Socket({socket: socketId, type: type, eventTime: new Date()});
    sock.save((err, doc) => {
        if(err) throw err;

        console.log('Data added');
    });
}

const makeDownloadEntry = (socketId, songId) => {
    const download = new Download({socket: socketId, songId: songId, downloadTime: new Date()});
    download.save((err, doc) => {
        if(err) throw err;

        console.log('Data added');
    });
}

app.get('/', (req, res) => {
    //Send html file to render
    res.sendFile(__dirname+'/index.html');
});

app.get('/musicData', (req, res) => {
    //Send music data
    res.status(200).send(musicFactory.getMusicData());
});

app.get('/search/filterMusic', (req, res) => {
    //console.log(musicFactory.filterMusic(req.query.artist,req.query.song,req.query.album,req.query.genre));
    res.status(200).send(musicFactory.filterMusic(req.query.artist,req.query.song,req.query.album,req.query.genre));
});

app.get('/search/favorite', (req, res) => {
    //console.log(req.query);
    res.status(200).send(musicFactory.addFavorite(parseInt(req.query.id)));
});

app.get('/download', (req, res) => {
    //console.log(req.query);
    res.status(200).send(musicFactory.downloadSong(parseInt(req.query.id)));
});

httpServer.listen(PORT, () => {
    console.log(`Socket running on port: ${PORT}`);
})

// io.listen(httpServer);

io.on('connection', (socket) => {
    console.log('SOCKET - Connection accepted');
    makeSocketEntry(socket.id, 'Connection');

    socket.on('disconnect', () => {
      console.log('SOCKET - Connection disconnected');
      makeSocketEntry(socket.id, 'Disconnect');
    });

    socket.on('download', (data) => {
        console.log(`SOCKET - Received client message to download music id: ${data}`);
        makeDownloadEntry(socket.id, data);
        socket.emit('download-received', data);
    })
});