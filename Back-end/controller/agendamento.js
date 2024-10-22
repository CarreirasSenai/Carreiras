
const Agendamento = require('../model/agendamento');

exports.read = (req, res) => {
    const user_id = req.session.usuario.id;
    const grupo = req.session.usuario.grupo;
    
    //const user_id = 25;  
    //const grupo = 'candidato';  
    const { month, year } = req.query;
    
    Agendamento.read(grupo, user_id, month, year, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
         return res.status(200).json(data);
    });
};

exports.readCandidatos = (req, res) => {
    const id = req.query.id;  
    Agendamento.readCandidatos(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'readCandidatos:', result: result });
        }
    });
}

exports.readAllCandidatos = (req, res) => {
    const id = req.query.id; 
    Agendamento.readAllCandidatos(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: 'readCandidatos:', result: result });
        }
    });
}

exports.update = (req, res) => {
    if(req.body.params){
        const { id, title, descricao, vaga, candidato, data, hora } = req.body.params;
        Agendamento.update(id, title, descricao, vaga, candidato, data, hora, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            } else if (result) {
                return res.status(200).json({ sucess: true, result: 'Agendamento Atualizado!' });
            }
        });
    }
}

// Create
exports.create = async (req, res) => {
    const { titulo, descricao, vaga, candidato, empresa, data, horario } = req.body.params;
    Agendamento.create( titulo, descricao, vaga, candidato, empresa, data, horario, (err, insertId) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });

        } if (insertId) {
            console.log(insertId);
            return res.json({ success: true, userId: insertId });
        }
    });
};


// Create
exports.delete = async (req, res) => {
    const { id } = req.params;
    Agendamento.delete( id , (err, insertId) => {
        if (!err) {
            console.log('HELLO')
            console.log(err.message)
            console.log(err)
            return res.status(500).json({ error: err.message });

        } else {
            return res.status(200).json({ success: true, message: 'Agendamento excluído com sucesso!' });
        }
    });
};