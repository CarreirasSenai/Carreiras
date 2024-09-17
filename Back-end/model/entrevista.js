const db = require('../config/db');

// Create
exports.create = (id_empresa, date, time, title, description, candidate, vaga, dataAtu, callback) => {
    db.query(
        'INSERT INTO agendamento (titulo, descricao, vaga, data, hora, id_empresa, id_candidato, data_atu) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, description, vaga, date, time, id_empresa, candidate, dataAtu],
        (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            callback(null, result.insertId);
        }
    );
};

// Read
exports.getByIdData = (id, date, callback) => {
    db.query('SELECT * FROM agendamento WHERE id = ? AND data = ?', [id, date], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, rows.length > 0 ? rows[0] : null);
    });
};

exports.getByIdUser = (id, month, year, callback) => {
    db.query(
        "SELECT * FROM agendamento WHERE id_candidato = ? AND YEAR(data) = ? AND MONTH(data) = ?", 
        [id, year, month], 
        (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            const organizedData = rows.map(row => ({
                date: row.data,
                title: row.titulo,
                description: row.descricao,
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

