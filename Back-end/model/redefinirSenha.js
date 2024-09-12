const db = require('../config/db');

exports.validaUser = (email, grupo, callback) => {
    console.log('model');

    db.query(`select * from user_${grupo} where email = ?`, [email], (err, result) => {

        if (err) {
            console.log(err);
            return callback(err, null);
        }

        return callback(null, result.length > 0 ? result[0] : null);
    });
}

exports.redefinirSenha = (dados, senha, callback) => {
    console.log('\nRedefinir Senha Model');

    const id = dados.id;
    const grupo = dados.grupo;

    db.query(`update user_${grupo} set senha = ? where id = ?`, [senha, id], (err, result) => {

        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            console.log(result);
            return callback(null, result);
        }
    });
}