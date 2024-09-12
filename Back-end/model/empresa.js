const db = require('../config/db');

exports.createCompany = (razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep, numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, responsavelAdm, contatoRA, senha, profissao, grupo, dataAtu, callback)

    db.query("SELECT 1 FROM user_empresa WHERE email = ?", [email], (err, results) => {
        if(err) 
            return callback(err, null);
        if (results.length > 0) 
            return callback(new Error('E-mail já cadastrado! Tente usar outro endereço de e-mail.'), null);
    });

    db.query("SELECT 1 FROM WHERE cnpj = ?", [cnpj], (err, results) => {
        if(err)
            return callback(err, null);
        if(results.lengths > 0)
            return callback(new Error('Este CNPJ já foi cadastrado!'), null);
    })