const db = require('../config/db');

exports.read = (grupo, id, month, year, callback) => {
    query = "SELECT * FROM agendamento WHERE id_empresa = ? AND YEAR(data) = ? AND MONTH(data) = ?"
    if (grupo = 'candidato'){
        query = "SELECT * FROM agendamento WHERE id_candidato = ? AND YEAR(data) = ? AND MONTH(data) = ?"
    }
    db.query(
        query, 
        [id, year, month], 
        (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            const organizedData = rows.map(row => ({
                title: row.titulo,
                description: row.descricao,
                vaga: row.vaga,
                id_candidato: row.id_candidato,
                id_empresa: row.id_empresa,
                data: row.data,
                hora: row.hora,
                type: 'event'
            }));
            console.log('Dados organizados:', organizedData);
            return callback(null, organizedData);
        }
    );
};


// Update
exports.update= (id_empresa, date, time, title, description, candidate, vaga, dataAtu, callback) => {
    db.query('UPDATE agendamento SET titulo = ?, descricao = ?, vaga = ?, data = ?, hora = ?, id_empresa = ?, id_candidato = ?, data_atu = ? WHERE id = ?', [title, description, vaga, date, time, id_empresa, candidate, dataAtu], (err, result) => {
        if (err) throw err;
        callback(result.affectedRows > 0);
    });
};

// Delete
exports.delete = (id, callback) => {
    db.query('DELETE FROM agendamento WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        callback(result.affectedRows > 0);
    });
};