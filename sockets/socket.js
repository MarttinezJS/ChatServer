const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

io.on('connection', client => {
    console.log('Cliente conectado');

    const [ valido, uid] = comprobarJWT( client.handshake.headers['x-token'] );

    if ( !valido ) return client.disconnect();

    usuarioConectado( uid );

    client.join( uid );

    client.on('mensaje-personal', async ( payload ) => {

        await grabarMensaje( payload )
        io.to( payload.para ).emit('mensaje-personla', payload);

    });


    client.on('disconnect', () => {
        usuarioDesconectado( uid );
    });

});
