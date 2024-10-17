const db = require("../config/db");

exports.create = (id, { dados }, callback) => {
    const respostas = dados;
    console.log(respostas);
    console.log(id);
}