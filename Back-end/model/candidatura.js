const db = require("../config/db");

exports.create = (idCandidato, { dados }, callback) => {
    const respostas = dados;

    const count = Object.keys(respostas).length;

    for (const key in respostas) {
        const idQuestionario = key.match(/\d+$/)[0];

        db.query('insert into candidatura (resposta, id_questionario, id_candidato) values (?, ?, ?)',
            [respostas[key], idQuestionario, idCandidato], (err, result) => {

                if (err) {
                    console.log(err.message);
                    if (key === count) {
                        return callback(err.message, null);
                    }
                } else if (result) {
                    console.log(result);
                    if (key === count) {
                        return callback(null, result);
                    }
                }
            });
    }
};

exports.read = (idCandidato, callback) => {
    db.query('select * from candidatura where id_candidato = ?', [idCandidato], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(err.message, null);
        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};