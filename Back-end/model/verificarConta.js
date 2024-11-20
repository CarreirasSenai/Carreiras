const db = require("../config/db");

exports.verificarConta = (grupo, email, token, callback) => {
    db.query(`SELECT * FROM user_${grupo} WHERE email = ? AND token_ativacao = ?`, [email, token], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(err, null);
        }
        if (result.length === 0) {
            return callback(new Error('Usuário não encontrado ou token inválido'), null);
        }

        db.query(`UPDATE user_${grupo} SET verificado = true WHERE email = ?`, [email], (err, result) => {
            if (err) {
                console.log(err.message);
                return callback(err, null);
            }
            return callback(null, result);
        });
    });
};
