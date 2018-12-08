const http = require('http');
const mongoose = require('mongoose');

const config = require('./config.json');
const app = require('../app.js');

const server = http.createServer(app);
const port = process.env.PORT || config.port;

global.authority;

mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log('Database connected');
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}.`)
});

module.exports = server;