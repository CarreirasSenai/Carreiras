const { query } = require('express');
const db = require('../config/db');

exports.read = (grupo, id, month, year, callback) => {
    var query = "SELECT a.*, c.nome_completo AS nome_candidato,"
    query += " CASE WHEN e.nome_fantasia IS NOT NULL THEN e.nome_fantasia ELSE e.razao_social END AS nome_empresa "
    query += " FROM agendamento AS a";
    query += " INNER JOIN user_candidato AS c ON c.id = a.id_candidato ";
    query += " INNER JOIN user_empresa AS e ON e.id = a.id_empresa ";
    query += " WHERE a.id_empresa = ? AND YEAR(data) = ? AND MONTH(data) = ? ";

    if (grupo == 'candidato') {  
        query = "SELECT a.*, c.nome_completo AS nome_candidato,"
        query += " CASE WHEN e.nome_fantasia IS NOT NULL THEN e.nome_fantasia ELSE e.razao_social END AS nome_empresa FROM agendamento AS a";
        query += " INNER JOIN user_candidato AS c ON c.id = a.id_candidato ";
        query += " INNER JOIN user_empresa AS e ON e.id = a.id_empresa ";
        query += " WHERE a.id_candidato = ? AND YEAR(data) = ? AND MONTH(data) = ? ";
    }

    db.query(
        query, 
        [id, year, month], 
        (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            const organizedData = rows.map(row => ({
                id: row.id,
                title: row.titulo,
                descricao: row.descricao,
                vaga: row.vaga,
                id_candidato: row.id_candidato,
                id_empresa: row.id_empresa,
                candidato: row.nome_candidato,
                empresa: row.nome_empresa,
                data: row.data,
                hora: row.hora
            }));
            return callback(null, organizedData);
        }
    );
};

exports.readCandidatos = (id, callback) => {
    var query = "SELECT DISTINCT user_candidato.id , user_candidato.nome_completo FROM vagas "
    query += " INNER JOIN candidatura ON vagas.id = candidatura.id_vaga";
    query += " INNER JOIN user_candidato ON candidatura.id_candidato = user_candidato.id";

    if (id && id != 0) {  
        query += " WHERE vagas.id = ?"
    }
    
    db.query( 
        query, 
        [id], 
        (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            const organizedData = rows.map(row => ({
                id: row.id,
                nome: row.nome_completo
            }));
            return callback(null, organizedData);
        }
    );
};

exports.readAllCandidatos = (id, callback) => {
    var query = "SELECT DISTINCT u.id, u.nome_completo FROM vagas v"
    query += " INNER JOIN candidatura c ON c.id_vaga = v.id"
    query += " INNER JOIN user_candidato u ON u.id = c.id_candidato"
    query += " WHERE v.id_empresa = ?;"

    db.query( 
        query, 
        [id], 
        (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            const organizedData = rows.map(row => ({
                id: row.id,
                nome: row.nome_completo
            }));
            return callback(null, organizedData);
        }
    );
};

exports.update = (id, title, descricao, vaga, candidato, data, hora, callback) => {
    if (candidato) {
        db.query('UPDATE agendamento SET titulo = ?, vaga = ?, data = ?, hora = ?, id_candidato = ?, descricao = ?  where id = ?', [title, vaga, data, hora, candidato, descricao, id], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                console.log(result);
                return callback(null, result.affectedRows > 0);
            }
        });
    } else {
        db.query('UPDATE agendamento SET titulo = ?, data = ?, hora = ?, descricao = ?  where id = ?', [title, data, hora, descricao, id], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                console.log(result);
                return callback(null, result.affectedRows > 0);
            }
        });
    }
    
}

// Create
exports.create = (title, descricao, vaga, candidato, empresa, data, hora, callback) => {
    vaga = vaga == 0 ? '' : vaga
    db.query('INSERT INTO agendamento (titulo, descricao, vaga, id_candidato, id_empresa, data, hora) VALUES (?, ?, ?, ?, ?, ?, ?)',[title, descricao, vaga, candidato, empresa, data, hora],(err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        return callback(null, 'Agendamento criado com sucesso');
    }
)};


//Delete
exports.delete = (id, callback) => {
    db.query('DELETE FROM agendamento WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        callback(result.affectedRows > 0);
    });
};