const jwt = require('jsonwebtoken');

// =====================
// VERIFICAR TOKEN
// =====================

let verificaToken = (req, res, next) => {

    let token = req.get('token'); //Authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario; // decoded = payload
        next();

    });

};

// =====================
// VERIFICAR ADMINROLE
// =====================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es Administrador'
            }
        });
    }

};

// =====================
// VERIFICA TOKEN PARA IMAGEN
// =====================

let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario; // decoded = payload
        next();

    });

};

module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}