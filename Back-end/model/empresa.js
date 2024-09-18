const db = require('../config/db');

exports.createCompany = (razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep, 
    numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel, contatoRA, senha, 
    grupo, callback) => {

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
        
            db.query('INSERT INTO user_empresa (razao_social, nome_fantasia, cnpj, inscricao_estadual, cep, endereco,'
            + ' numero, complemento, bairro, cidade, estado, email, telefone, celular, responsavel_legal,'
            + ' cpf_responsavel, contato_responsavel, senha, grupo, descricao, foto, capa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,'
            + ' ?, ?)',
            [razaoSocial, nomeFantasia, cnpj, inscricaoEstadual, cep, endereco, numero, complemento, bairro, cidade,
            estado, email, telefone, celular, responsavelLegal, cpfResponsavel, contatoRA, senha, grupo, '', '', ''], (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                callback(null, result.insertId);
            }
        ) 
    }
