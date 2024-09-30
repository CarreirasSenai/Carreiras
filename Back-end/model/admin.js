const db = require("../config/db");

// Create
exports.createUser = (tipo_admin, status, nome, email, cpf, hashedPassword, celular, grupo, callback) => {

    // Verificar se o email já existe
    db.query('SELECT * FROM user_candidato WHERE email = ?', [email], (err, results) => {
        if (err) {
            // Se houver um erro na consulta, retornar o erro no callback
            return callback(err, null);
        }
        if (results.length > 0) {
            // console.log('Este email já foi cadastrado!');
            return callback(new Error('E-mail já cadastrado! Tente usar outro endereço de e-mail.'), null);
        }

        db.query('SELECT * FROM user_candidato WHERE cpf = ?', [cpf], (err, results) => {
            if (err) {
                // Se houver um erro na consulta, retornar o erro no callback
                return callback(err, null);
            }
            if (results.length > 0) {
                // console.log('Este email já foi cadastrado!');
                return callback(new Error('Este CPF já foi cadastrado!'), null);
            }

            db.query(
                'INSERT INTO user_candidato (tipo_admin, status, nome, email, cpf, hashedPassword, celular, grupo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [tipo_admin, status, nome, email, cpf, hashedPassword, celular, grupo,],
                (err, result) => {

                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    callback(null, result.insertId);
                }
            );
        });
    });
};

// Login
exports.getLogin = (email, callback) => {
    db.query('SELECT * FROM user_admin WHERE email = ?', [email], (err, rows) => {
        if (err) {
            console.log(err);
            return callback(err, null, null);

        } else if (rows) {
            console.log(rows[0]);
            return callback(null, rows[0], null);

        } else {
            console.log('Não há cadastro com este e-mail!');
            return callback(null, null, 'Não há cadastro com este e-mail!');
        }
    });
};

// Read
exports.getUser = (id, callback) => {
    db.query('SELECT * FROM user_admin WHERE id = ?', [id], (err, rows) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, rows.length > 0 ? rows[0] : null);
    });
};