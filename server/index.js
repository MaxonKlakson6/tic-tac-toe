const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

server.listen(5000, () => {
    console.log('server ran on port 3000');
})