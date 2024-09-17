const Entrevista = require('../model/entrevista');
const DataHora = require('../services/dataHora');

// Create
exports.create = async (req, res) => {
    const {date, time, title, description, candidate, vaga} = req.body;
    const dataAtu = DataHora.dataHora();
    const id_empresa = 1;
    //const id_empresa = req.session.usuario.id;

    Entrevista.create(id_empresa, date, time, title, description, candidate, vaga, dataAtu, (err, insertId) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }

        res.json({ success: true, userId: insertId });
    });
};

exports.getByIdUser = (req, res) => {
    //usuario_id = req.session.usuario.id;
    const usuario_id=1
    const {month, year} = req.body;
     
    Entrevista.getByIdUser(usuario_id, month, year, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.json({ success: true, usuario: data });
    });
};

// Delete
exports.delete = (req, res) => {
    const { id } = req.body;
    Entrevista.delete(id, (success) => {
    });
};
