const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const validarCampos = ( req, res, next) => {

    const errores = validationResult( req );

    if ( !errores.isEmpty() )  {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

const validarJWT = ( req, res, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token en la peticion'
        });
    }
    
    try {

        const { uid } = jwt.verify( token, process.env.JWT_SEED );
        req.uid = uid;

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no valido'
        });
        
    }
    next();
}

module.exports = {
    validarCampos,
    validarJWT
}