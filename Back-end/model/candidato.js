const db = require('../config/db');

// Create
exports.createUser = (nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, password, area, profissao, grupo, token, callback) => {

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
                `INSERT INTO user_candidato (nome_social, nome_completo, email, telefone, celular, cpf, cep, rua, numero, complemento, bairro, cidade, estado, senha, area, profissao, grupo, token_ativacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, password, area, profissao, grupo, token],
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
exports.getUser = (usuario_id, callback) => {
    console.log('ID recebido no modelo:', usuario_id);

    db.query('SELECT * FROM user_candidato WHERE id = ?', [usuario_id], (err, rows) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err.message);
            return callback(err, null);
        }

        console.log('Resultado da consulta:', rows);
        return callback(null, rows.length > 0 ? rows[0] : null);
    });
};

// Login
exports.getLogin = (email, callback) => {
    db.query('SELECT * FROM user_candidato WHERE email = ?', [email], (err, rows) => {
        if (err) {
            console.log(err);
            return callback(err, null, null);

        } else if (rows.length > 0) {
            db.query('SELECT * FROM user_candidato WHERE email = ? AND verificado = ?', [email, 1], (err, rows) => {
                if (err) {
                    console.log(err);
                    return callback(err, null, null);
                } else if (rows.length > 0) {
                    return callback(null, rows[0], null);
                } else {
                    console.log('Conta não Verificada!');
                    return callback(null, null, 'Conta não Verificada!');
                }
            });
        } else {
            console.log('Não há cadastro com este e-mail!');
            return callback(null, null, 'Não há cadastro com este e-mail!');
        }
    });
};

exports.updateUser = (nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, area, profissao, verificado, grupo, id, callback) => {
    let query = `UPDATE user_candidato 
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
    profissao = ?,`

    let fields = [nomeSocial, nomeCompleto, email, phone, cellphone, cpf, cep, rua, numCasa, complemento, bairro, cidade, estado, area, profissao]

    if (verificado != null && verificado != undefined && verificado !== '') {
        query += 'verificado = ?,';
        fields.push(verificado);
    }

    query += `grupo = ?
    WHERE id = ?`;
    fields.push(grupo);
    fields.push(id);

    db.query(query, fields,
        (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
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

exports.pesquisaCandidato = (busca, callback) => {
    const buscaComCuringa = `%${busca}%`; // Adiciona o curinga para busca parcial
    const sql = `
        SELECT * FROM user_candidato
        WHERE CONCAT(nome_social, ' ', nome_completo, ' ', email, ' ', cpf, ' ', celular) LIKE ?
    `;
    db.query(sql, [buscaComCuringa], (err, row) => {
        if (err)
            return callback(err, null);

        return callback(null, row);
    });
};

exports.getAllCandidatos = (callback) => {
    db.query('SELECT * FROM user_candidato', (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }

        console.log(result);
        return callback(null, result.length > 0 ? result : null);
    });
};


exports.updateUserLinks = (id, link_instagram, link_facebook, link_linkedin, link_github, link_site_pessoal,
    callback) => {
    db.query(`UPDATE user_candidato SET link_instagram = ?, link_facebook = ?, link_linkedin = ?,
        link_github = ?, link_site_pessoal = ? WHERE id = ?`, [link_instagram, link_facebook, link_linkedin, link_github, link_site_pessoal, id],
        (err, result) => {
            if (err)
                return callback(err, null);

            return callback(null, result.affectedRows > 0 ? result : null);
        });
}