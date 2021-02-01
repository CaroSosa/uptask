const express = require('express');
const server = express();
const routes = require('./routes');

server.listen(3000);

server.use('/', routes());
