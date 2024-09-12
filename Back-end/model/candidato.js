const db = require('../config/db');

// Create
exports.createUser = (nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, password, area, profissao, grupo, callback) => {

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
                'INSERT INTO user_candidato (nome_social, nome_completo, email, telefone, celular, cpf, cep, rua, numero, complemento, bairro, cidade, estado, senha, area, profissao, grupo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, password, area, profissao, grupo],
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

// Read
exports.getUser = (id, callback) => {
    db.query('SELECT * FROM user_candidato WHERE id = ?', [id], (err, rows) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, rows.length > 0 ? rows[0] : null);
    });
};

// Login
exports.getLogin = (email, callback) => {
    db.query('SELECT * FROM user_candidato WHERE email = ?', [email], (err, rows) => {
        if (err) {
            return callback(err, null);
        }

        // Retorna o primeiro usuário encontrado ou null se nenhum usuário for encontrado
        return callback(null, rows.length > 0 ? rows[0] : null);
    });
};

// Update
exports.updateUser = (nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, area, profissao, grupo, id, callback) => {
    db.query(`UPDATE user_candidato 
        SET nome_social = ?, 
        nome_completo = ?, 
        email = ?, 
        telefone = ?, 
        celular = ?, 
        cpf = ?, 
        cep = ?, 
        rua = ?, 
        numero = ?, 
        complemento = ?, 
        bairro = ?, 
        cidade = ?, 
        estado = ?,
        area = ?,
        profissao = ?, 
        grupo = ?
        WHERE id = ?`,
        [nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, area, profissao, grupo, id], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                // console.log(result);
                return callback(null, result.affectedRows > 0);
            }
        });
};

// Delete
exports.deleteUser = (id, callback) => {
    db.query('DELETE FROM user_candidato WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else if (result) {
            // console.log(result);
            return callback(null, result.affectedRows > 0);
        }
    });
};

