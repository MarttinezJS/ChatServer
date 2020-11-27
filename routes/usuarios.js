const { check }  = require('express-validator');
const { Router } = require('express');

const { crearUsuario, login, renovarToken, getUsuarios } = require('../controllers/usuarios');
const { validarCampos, validarJWT } = require('../middlewares/middlewares');

const router = Router();
// usuarios
router.post('/new', [
    check('email','Correo no valido').isEmail(),
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('password', 'Nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario );

router.post('/', [
    check('email','Correo no valido').isEmail(),
    check('password', 'Nombre es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.get('/renovar', [
    validarJWT
], renovarToken);

router.get('/',[
    validarJWT,
], getUsuarios);

module.exports = router;