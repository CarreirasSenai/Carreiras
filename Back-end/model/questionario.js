const db = require("../config/db")

exports.create = (dados, callback) => {
    console.log(dados);
    const { tipo, pergunta, respostas, respCorreta, idVaga } = dados;

    db.query('insert into questionario (tipo, pergunta, respostas, respCorreta, id_vaga) values (?,?,?,?,?)',
        [tipo, pergunta, JSON.stringify(respostas), respCorreta, idVaga],
        (err, result) => {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                console.log(result);
                return callback(null, result.insertId);
            }
        });
};

exports.read = (id, callback) => {
    console.log(id);

    db.query('select * from questionario where id_vaga = ?', [id], (err, row) => {
        if (err) {
            console.log(err);
            return callback(err, null);

        } else if (row) {
            console.log(row);
            return callback(null, row);
        }
    });
};
