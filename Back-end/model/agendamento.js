const db = require('../config/db');

exports.read = (grupo, id, month, year, callback) => {
    var query = "SELECT a.*, c.nome_completo AS nome_candidato,"
    query += " CASE WHEN e.nome_fantasia IS NOT NULL THEN e.nome_fantasia ELSE e.razao_social END AS nome_empresa FROM agendamento AS a";
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

exports.update = (dados, callback) => {
    const id = dados.id;
    const titulo = dados.titulo;
    const vaga = dados.vaga;
    const data = dados.data;
    const hora = dados.hora;
    const id_candidato = dados.id_candidato;
    const data_atu = NOW();
    const descricao = dados.descricao;
    
    db.query('update agendamento SET titulo = ?, vaga = ?, data = ?, hora = ?, id_candidato = ?, data_atu = ?, descricao = ?  where id = ?', [titulo, vaga, data, hora, id_candidato,data_atu,descricao, id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else if (result) {
            console.log(result);
            return callback(null, result.affectedRows > 0);
        }
    });
}

// // Update
// exports.update= (id_empresa, date, time, title, description, candidate, vaga, dataAtu, callback) => {
//     db.query('UPDATE agendamento SET titulo = ?, descricao = ?, vaga = ?, data = ?, hora = ?, id_empresa = ?, id_candidato = ?, data_atu = ? WHERE id = ?', [title, description, vaga, date, time, id_empresa, candidate, dataAtu], (err, result) => {
//         if (err) throw err;
//         callback(result.affectedRows > 0);
//     });
// };

// // Delete
// exports.delete = (id, callback) => {
//     db.query('DELETE FROM agendamento WHERE id = ?', [id], (err, result) => {
//         if (err) throw err;
//         callback(result.affectedRows > 0);
//     });
// };