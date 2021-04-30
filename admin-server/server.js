const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {login} = require('./controllers/login');
const {checkUser} = require('./controllers/checkUser');
const {connect} = require('./database/config');
const {connectionEvent} = require('./controllers/connectionEvent');
const {downloadEvent} = require('./controllers/downloadEvent');
const cors = require('cors');

const PORT = 3003;

//Connecting to database
connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', login);
app.post('/checkuser', checkUser);
app.get('/connection-event', connectionEvent);
app.get('/download-event', downloadEvent);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})