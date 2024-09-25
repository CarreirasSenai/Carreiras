// Middleware de autenticação
module.exports = (req, res, next) => {
    console.log(req.session)
    if (!req.session.usuario) {
        return res.status(401).json({ error: 'Usuário não autenticado!' });
    }
    
    console.log('Usuário autenticado: ', req.session.usuario.email);

    next();
};