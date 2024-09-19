const db = require("../config/db");

exports.vagaCreate = (id, { dados }, callback) => {
    const { titulo, cep, cidade, estado, contrato, modalidade, nivel, remuneracao, habsExigidas, habsOpcionais, descricao, etapas, questionario } = dados;

    db.query('insert into vagas (titulo, cep, cidade, estado, contrato, modalidade, nivel, remuneracao, habilidades_exigidas, habilidades_opcionais, descricao, etapas, questionario, id_empresa) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [titulo, cep, cidade, estado, contrato, modalidade, nivel, remuneracao, JSON.stringify(habsExigidas), JSON.stringify(habsOpcionais), descricao, JSON.stringify(etapas), JSON.stringify(questionario), id],
        (err, result) => {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                console.log(result);
                return callback(null, result.insertId);
            }
        });
};

exports.vagaRead = (id, callback) => {
    db.query('select * from vagas where id_empresa = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);

        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};

exports.vagaReadAll = (callback) => {
    db.query('select * from vagas', (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);

        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};

exports.vagaUpdate = ({ dados }, callback) => {
    const { id, titulo, cep, cidade, estado, contrato, modalidade, nivel, remuneracao, habsExigidas, habsOpcionais, descricao, etapas, questionario } = dados;

    db.query(`
        update vagas 
        set titulo = ?,
        cep = ?,
        cidade = ?,
        estado = ?,
        contrato = ?,
        modalidade = ?,
        nivel = ?,
        remuneracao = ?,
        habilidades_exigidas = ?,
        habilidades_opcionais = ?,
        descricao = ?,
        etapas = ?,
        questionario = ?
        where id = ?
        `,
        [titulo, cep, cidade, estado, contrato, modalidade, nivel, remuneracao, JSON.stringify(habsExigidas), JSON.stringify(habsOpcionais), descricao, JSON.stringify(etapas), JSON.stringify(questionario), id],
        (err, result) => {

            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                console.log(result);
                return callback(null, result);
            }
        });
};

exports.vagaDelete = (id, callback) => {
    db.query('delete from vagas where id = ?', [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(null, err.message);
        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};

exports.vagaPesquisa = (dados, callback) => {
    console.log('model');
    console.log(dados);

    // Base da query SQL
    let query = 'SELECT * FROM vagas WHERE 1=1';
    let queryParams = [];

    // Adiciona filtros à query se os valores não forem vazios
    if (dados.palavraChave) {
        query += ' AND titulo LIKE ?';
        queryParams.push(`%${dados.palavraChave}%`);
    }
    if (dados.cidade) {
        query += ' AND cidade = ?';
        queryParams.push(dados.cidade);
    }
    if (dados.estado) {
        query += ' AND estado = ?';
        queryParams.push(dados.estado);
    }
    if (dados.contrato) {
        query += ' AND contrato = ?';
        queryParams.push(dados.contrato);
    }
    if (dados.modalidade) {
        query += ' AND modalidade = ?';
        queryParams.push(dados.modalidade);
    }
    if (dados.remuneracao) {
        query += ' AND remuneracao >= ?';
        queryParams.push(dados.remuneracao);
    }
    if (dados.dataInicio) {
        query += ' AND data_atu >= ?';
        queryParams.push(dados.dataInicio);
    }
    if (dados.dataFim) {
        query += ' AND data_atu <= ?';
        queryParams.push(dados.dataFim);
    }

    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            console.log(result);
            return callback(null, result);
        }
    });
};
