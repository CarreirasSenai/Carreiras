const db = require("../config/db");

// Create
exports.createUser = (nome, email, cpf, hashedPassword, celular, tipo, status, grupo, callback) => {

    // Verificar se o email já existe
    db.query('SELECT * FROM user_admin WHERE email = ?', [email], (err, results) => {
        if (err) {
            // Se houver um erro na consulta, retornar o erro no callback
            return callback(err, null);
        }
        if (results.length > 0) {
            // console.log('Este email já foi cadastrado!');
            return callback(new Error('E-mail já cadastrado!'), null);
        }

        db.query('SELECT * FROM user_admin WHERE cpf = ?', [cpf], (err, results) => {
            if (err) {
                // Se houver um erro na consulta, retornar o erro no callback
                return callback(err, null);
            }
            if (results.length > 0) {
                // console.log('Este email já foi cadastrado!');
                return callback(new Error('Este CPF já foi cadastrado!'), null);
            }

            db.query(
                'INSERT INTO user_admin (nome, email, cpf, senha, celular, tipo_admin, status, grupo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [nome, email, cpf, hashedPassword, celular, tipo, status, grupo],
                (err, result) => {

                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    callback(null, result);
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

        } else if (rows.length > 0) {
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
            console.log(err);
            return callback(err, null);
        }


        // console.log(rows[0]);
        return callback(null, rows.length > 0 ? rows[0] : null);
    });
};

exports.getAllUser = (callback) => {
    db.query('SELECT * FROM user_admin', (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }

        console.log(result);
        return callback(null, result.length > 0 ? result : null);
    });
};

// Update
// Necesssário fazer a validação se o email ou cpf de atualziação já existe como no cadastro, a falta disso ocasionara um erro no database - thiago :)
exports.updateUser = (id, nome, email, cpf, celular, tipo, status, callback) => {

    // Verificar se o email já existe
    db.query('SELECT * FROM user_admin WHERE email = ? AND id != ?', [email, id], (err, results) => {
        if (err) {
            // Se houver um erro na consulta, retornar o erro no callback
            return callback(err, null);
        }
        if (results.length > 0) {
            // console.log('Este email já foi cadastrado!');
            return callback(new Error('E-mail já cadastrado!'), null);
        }

        db.query('SELECT * FROM user_admin WHERE cpf = ? AND id != ?', [cpf, id], (err, results) => {
            if (err) {
                // Se houver um erro na consulta, retornar o erro no callback
                return callback(err, null);
            }
            if (results.length > 0) {
                // console.log('Este email já foi cadastrado!');
                return callback(new Error('Este CPF já foi cadastrado!'), null);
            }

            db.query(`UPDATE user_admin 
                SET nome = ?, 
                email = ?, 
                cpf = ?, 
                celular = ?, 
                tipo_admin = ?, 
                status = ?
                WHERE id = ?`,
                [nome, email, cpf, celular, tipo, status, id], (err, result) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else if (result) {
                        console.log(result);
                        return callback(null, result.affectedRows > 0);
                    }
                });
        });
    });
};

exports.updateUserEmpresa = (id, razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual,
    cep, numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpf_responsavel, contatoRA, 
    statusUser, callback) => {
        db.query("SELECT 1 FROM user_empresa WHERE email = ? AND id != ?", [email, id], (err, results) => {
            if(err)
                return callback(err, null);

            if(results.length > 0)
                return callback(new Error('E-mail já cadastrado!'), null);
        });

        db.query("SELECT 1 FROM user_empresa WHERE cnpj = ? AND id != ?", [cnpj, id], (err, results) => {
            if(err)
                return callback(err, null);
            
            if(results.length > 0)
                return callback(new Error('CNPJ já cadastrado!'), null);
        });

        db.query(`UPDATE user_empresa
        SET verificado = ?,
        razao_social = ?,
        nome_fantasia = ?,
        cnpj = ?,
        inscricao_estadual = ?,
        cep = ?,
        endereco = ?,
        numero = ?,
        complemento = ?,
        endereco = ?,
        bairro = ?,
        cidade = ?,
        estado = ?,
        email = ?,
        telefone = ?,
        celular = ?,
        responsavel_legal = ?,
        cpf_responsavel = ?,
        contato_responsavel = ?`, [statusUser, razaoSocial, nomeFantasia, email, cnpj, inscricaoEstadual,
        cep, endereco, numero, complemento, bairro, cidade, estado, email, telefone, celular, responsavelLegal, cpf_responsavel,
        contatoRA], (err, result) => {
            if(err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                return callback(null, result.affectedRows > 0);
            }
        })
    }

// Delete
exports.deleteUser = (id, callback) => {
    db.query('DELETE FROM user_admin WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else if (result) {
            console.log(result);
            return callback(null, result.affectedRows > 0);
        }
    });
};

exports.pesquisaUser = (busca, callback) => {
    const buscaComCuringa = `%${busca}%`; // Adiciona o curinga para busca parcial

    const sql = `
        SELECT * FROM user_admin 
        WHERE CONCAT(nome, ' ', email, ' ', cpf, ' ', celular, ' ', tipo_admin, ' ', status) LIKE ?
    `;

    db.query(sql, [buscaComCuringa], (err, row) => {
        if (err) {
            // console.log(err);
            return callback(err, null);
        }

        // console.log(row);
        return callback(null, row);
    });
};