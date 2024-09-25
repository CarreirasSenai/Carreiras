const db = require('../config/db');

//Create    
exports.createCompany = (razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep, 
numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel, contatoRA, senha, 
grupo, token, callback) => {

        db.query("SELECT 1 FROM user_empresa WHERE email = ?", [email], (err, results) => {
            if(err) 
                return callback(err, null);
            if (results.length > 0) 
                return callback(new Error('E-mail já cadastrado! Tente usar outro endereço de e-mail.'), null);
        });
    
        db.query("SELECT 1 FROM user_empresa WHERE cnpj = ?", [cnpj], (err, results) => {
            if(err)
                return callback(err, null);
            if(results.lengths > 0)
                return callback(new Error('Este CNPJ já foi cadastrado!'), null);
        });
    
        db.query('INSERT INTO user_empresa (token_ativacao, razao_social, nome_fantasia, cnpj, inscricao_estadual, cep, endereco,'
        + ' numero, complemento, bairro, cidade, estado, email, telefone, celular, responsavel_legal,'
        + ' cpf_responsavel, contato_responsavel, senha, grupo, descricao, foto, capa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,'
        + ' ?, ?)',
        [token, razaoSocial, nomeFantasia, cnpj, inscricaoEstadual, cep, endereco, numero, complemento, bairro, cidade,
        estado, email, telefone, celular, responsavelLegal, cpfResponsavel, contatoRA, senha, grupo, '', '', ''], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            callback(null, result.insertId);
        }
    ) 
}

//Read
exports.getLogin = (email, callback) => {
    db.query('SELECT * FROM user_empresa WHERE email = ?', [email], (err, rows) => {
        if (err) {
            console.log(err);
            return callback(err, null, null);
            
        } else if (rows.length > 0) {
            db.query('SELECT * FROM user_empresa WHERE email = ? AND verificado = ?', [email, 1], (err, rows) => {
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

//Read
exports.getUser = (id, callback) => {
    db.query("SELECT * FROM user_empresa WHERE id = ?", [id], (err, rows) => {
        if(err)
            return callback(err, null);
        
        return callback(null, rows.length > 0 ? rows[0] : null);
    })
}

exports.updateUser = (razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep, numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel, contatoRA, grupo, id,
callback) => {
    db.query(`UPDATE user_empresa
        SET razao_social = ?,
        nome_fantasia = ?,
        email = ?,
        telefone = ?,
        celular = ?,
        cnpj = ?,
        inscricao_estadual = ?,
        cep = ?,
        endereco = ?,
        numero = ?,
        complemento = ?,
        bairro = ?,
        cidade = ?,
        estado = ?,
        responsavel_legal = ?,
        cpf_responsavel = ?,
        contato_responsavel = ?,
        grupo = ?
        WHERE id = ?`,
        [razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep, endereco, 
        numero, complemento, bairro, cidade, estado, responsavelLegal, cpfResponsavel, contatoRA, grupo, id], 
        (err, result) => {
            if(err){
                console.log(err);
                return callback(err, null);
            } else if (result) {
                return callback(null, result.affectedRows > 0);
            }
        })
}
