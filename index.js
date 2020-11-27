const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
require('dotenv').config();
require('./database/config').dbConnection();

module.exports.io = require('socket.io')(server);
require('./sockets/socket');

app.use( express.json() );

const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

app.use('/usuarios', require('./routes/usuarios'));
app.use('/mensajes', require('./routes/mensajes'));

server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});

