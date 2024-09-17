const Empresa = require('../model/empresa');
const DataHora = require('../services/dataHora');
const bcrypt = require('bcrypt');

exports.createCompany = async(req, res) => {
    const { razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep,
    numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel, 
    contatoRA, senha} = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    
    const grupo = 'empresa';

    Empresa.createCompany(razaoSocial, nomeFantasia, email, telefone, celular, cnpj, inscricaoEstadual, cep,
        numero, complemento, endereco, bairro, cidade, estado, responsavelLegal, cpfResponsavel, contatoRA,
        hashedPassword, grupo, (err, insertId) => {
            if(err) {
                console.log(err.message);
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json({success: true, userId: insertId});
        });
}