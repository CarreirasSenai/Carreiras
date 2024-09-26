const Agendamento = require('../model/agendamento');

exports.read = (req, res) => {
    //const user_id = req.session.usuario.id;
    //const grupo = req.session.usuario.grupo;
    const user_id=1
    const grupo='candidato';
    const {month, year} = req.body;
     
    Agendamento.getByIdUser(grupo, user_id, month, year, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
}