const db = require("../config/db");

exports.create = (idCandidato, idVaga, { dados }, callback) => {
    const respostas = dados;
    let qtdAlternativas = 0;
    let qtdCorretas = 0;

    // Inserir candidatura no banco
    db.query('insert into candidatura (id_candidato, id_vaga) values (?, ?)', [idCandidato, idVaga], (err, result) => {
        if (err) {
            return callback(err.message, null);
        }

        const idCandidatura = result.insertId;
        console.log('idCandidatura: ', idCandidatura);

        // Obter habilidades exigidas da vaga
        const getHabilidadesExigidas = new Promise((resolve, reject) => {
            db.query('select * from vagas where id = ?', [idVaga], (err, rows) => {
                if (err) return reject(err);

                try {
                    const habilidadesExigidas = JSON.parse(rows[0].habilidades_exigidas);
                    resolve(habilidadesExigidas);
                } catch (parseErr) {
                    reject('Erro ao parsear habilidades exigidas.');
                }
            });
        });

        // Obter habilidades do candidato
        const getHabilidadesCandidato = new Promise((resolve, reject) => {
            db.query('SELECT * FROM habilidade WHERE id_candidato = ?', [idCandidato], (err, rows) => {
                if (err) return reject(err);

                try {
                    const habilidadesCandidato = JSON.parse(rows[0].habilidades);
                    resolve(habilidadesCandidato);
                } catch (parseErr) {
                    reject('Erro ao parsear habilidades do candidato.');
                }
            });
        });

        // Processar habilidades
        Promise.all([getHabilidadesExigidas, getHabilidadesCandidato])
            .then(([habilidadesExigidas, habilidadesCandidato]) => {
                const qtdHabilidadesExigidas = habilidadesExigidas.length;
                const habilidadesPossuidas = habilidadesExigidas.filter((habilidade) =>
                    habilidadesCandidato.includes(habilidade)
                );
                const qtdHabilidadesPossuidas = habilidadesPossuidas.length;

                console.log('Habilidades exigidas:', qtdHabilidadesExigidas);
                console.log('Habilidades possuídas:', qtdHabilidadesPossuidas);

                // Processar questionário
                const promises = Object.keys(respostas).map((key) => {
                    const idQuestionario = key.match(/\d+$/)[0];

                    return new Promise((resolve, reject) => {
                        db.query('select * from questionario where id = ?', [idQuestionario], (err, rows) => {
                            if (err) return reject(err);

                            if (rows[0].tipo === 'alternativa') {
                                qtdAlternativas += 1;
                                if (rows[0].respCorreta === respostas[key]) {
                                    qtdCorretas += 1;
                                }
                            }

                            db.query(
                                'insert into questionario_respostas (resposta, id_questionario, id_candidato, id_vaga) values (?, ?, ?, ?)',
                                [respostas[key], idQuestionario, idCandidato, idVaga],
                                (err, result) => {
                                    if (err) return reject(err);
                                    resolve(result);
                                }
                            );
                        });
                    });
                });

                return Promise.all(promises).then(() => ({
                    qtdHabilidadesExigidas,
                    qtdHabilidadesPossuidas,
                }));
            })
            .then(({ qtdHabilidadesExigidas, qtdHabilidadesPossuidas }) => {
                const percentQuestionario = (qtdCorretas / qtdAlternativas) * 100 || 0;
                const percentHabilidades = (qtdHabilidadesPossuidas / qtdHabilidadesExigidas) * 100 || 0;

                console.log('Questionário:', percentQuestionario, '%');
                console.log('Habilidades:', percentHabilidades, '%');
                console.log('Total:', percentQuestionario + percentHabilidades, '%');

                callback(null, { percentQuestionario, percentHabilidades });
            })
            .catch((err) => {
                callback(err, null);
            });
    });
};

exports.read = (idCandidato, idVaga, callback) => {
    db.query('select * from carreiras.candidatura where id_candidato = ? and id_vaga = ?', [idCandidato, idVaga], (err, result) => {
        if (err) {
            console.error(err.message);
            return callback(err.message, null);
        }

        if (result.length === 0) {
            return callback('Nenhum resultado encontrado', null);
        }

        console.log(result);
        return callback(null, result[0]);
    });
};

exports.readVaga = (idVaga, callback) => {
    db.query('select * from carreiras.candidatura where id_vaga = ?', [idVaga], (err, result) => {
        if (err) {
            console.error(err.message);
            return callback(err.message, null);
        }

        if (result.length === 0) {
            return callback('Nenhum resultado encontrado', null);
        }

        console.log(result);
        return callback(null, result);
    });
};

exports.delete = (idCandidato, idVaga, callback) => {
    db.query('delete from candidatura where id_candidato = ? and id_vaga = ?', [idCandidato, idVaga], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(err, null);
        }

        db.query('delete from questionario_respostas where id_candidato = ? and id_vaga = ?', [idCandidato, idVaga], (err, result) => {
            if (err) {
                console.log(err.message);
                return callback(err, null);
            } else {
                console.log(result);
                return callback(null, result);
            }
        });
    });
};