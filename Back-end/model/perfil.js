const db = require("../config/db");

exports.perfilUpdate = (fotoNome, capaNome, grupo, id, callback) => {
    // Array para armazenar os campos a serem atualizados
    let campos = [];
    let valores = [];

    if (fotoNome) {
        campos.push('foto = ?');
        valores.push(fotoNome);
    }

    if (capaNome) {
        campos.push('capa = ?');
        valores.push(capaNome);
    }

    if (campos.length === 0) {
        return callback(new Error('Nenhum campo para atualizar'), null);
    }

    let sql = `UPDATE user_${grupo} SET ${campos.join(', ')} WHERE id = ?`;

    // Adiciona o id aos valores
    valores.push(id);

    db.query(sql, valores, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else if (result) {
            console.log(result);
            return callback(null, result.affectedRows > 0);
        }
    });
};