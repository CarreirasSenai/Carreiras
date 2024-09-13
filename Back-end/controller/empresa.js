const Empresa = require('../model/empresa');
const DataHora = require('../services/dataHora');
const bcrypt = require('bcrypt');

exports.createCompany = async(req, res) => {
    const { razaoSocial, nomeFantasia, email, telefone, celular} = req.body;
}