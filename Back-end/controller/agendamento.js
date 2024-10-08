
const Agendamento = require('../model/agendamento');

exports.read = (req, res) => {
    //const user_id = req.session.usuario.id;
    //const grupo = req.session.usuario.grupo;
    
    const user_id = 25;  
    const grupo = 'candidato';  
    const { month, year } = req.query;
    
    Agendamento.read(grupo, user_id, month, year, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
         return res.status(200).json(data);
    });
};

exports.update = (req, res) => {
    const { dados } = req.body;

    Agendamento.update(dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Agendamento Atualizado!' });
        }
    });
}
