const db = require("../config/db");
const transporter = require('../services/nodemailer');

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

                let habilidadesExigidas = [];
                if (rows[0].habilidades_exigidas) {
                    habilidadesExigidas = JSON.parse(rows[0].habilidades_exigidas);
                }
                resolve(habilidadesExigidas);
            });
        });

        // Obter habilidades do candidato
        const getHabilidadesCandidato = new Promise((resolve, reject) => {
            db.query('SELECT * FROM habilidade WHERE id_candidato = ?', [idCandidato], (err, rows) => {
                if (err) return reject(err);

                let habilidadesCandidato = [];
                if (rows.length) {
                    habilidadesCandidato = JSON.parse(rows[0].habilidades);
                }
                resolve(habilidadesCandidato);
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
                const percentTotal = (percentQuestionario + percentHabilidades) / 2;

                console.log('Questionário:', percentQuestionario, '%');
                console.log('Habilidades:', percentHabilidades, '%');
                console.log('Total:', percentTotal, '%');

                db.query('update candidatura set relevancia = ? where id = ?', [percentTotal, idCandidatura], (err, result) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);

                    } else if (result) {
                        console.log(result);
                    }
                });

                callback(null, { percentTotal });
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

exports.update = (idCandidato, idVaga, selecao, justificativa, callback) => {

    if (selecao === 0) {
        let email;
        db.query('SELECT * FROM user_candidato WHERE id = ?', [idCandidato], (err, rows) => {
            if (err) {
                return callback(err, null);
            }

            email = rows[0].email;
            console.log(email);


            const corpo =
                `
        <div style="font-family: Arial, Helvetica, sans-serif; 
            text-align: center; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center;">
            <div style="text-align: center; width: 100%;">
                <hr>
                <h1 style="color: #333;">Carreiras 🐝</h1>
                <div style="background: linear-gradient(to right, #6f00ff, #9341ff);
                    padding: 50px;
                    color: white;
                    box-shadow: 0 1px 4px #333;">
                    <div>
                        <div style="font-size: 17px">
                            ${justificativa}
                        </div>
                        <br><br><br>
                        <small>
                            <a target="_blank" href="https://www.carreiras.com.br" style="color: white;">
                                www.carreiras.com.br
                            </a>
                        </small>
                    </div>
                </div>
                <br>
                <hr>
            </div>
        </div>
        `;

            async function main() {
                const info = await transporter.sendMail({
                    from: '"Carreiras" <carreirassenai@gmail.com>',
                    to: email,
                    subject: 'Justificativa para não Contratação',
                    html: corpo
                });

                console.log("Email enviado para:", info.accepted);
            }
            main().catch(console.error);
        });
    }

    if (selecao === 2) {
        db.query('update candidatura set status = ? where id_vaga = ? and status = 2', [1, idVaga], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else if (result) {
                console.log(result);
            }
        });
    }

    db.query('update candidatura set status = ? where id_candidato = ? and id_vaga = ?', [selecao, idCandidato, idVaga], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else if (result) {
            console.log(result);
            return callback(null, result.affectedRows > 0);
        }
    });
}

exports.justificaGeral = (candidatos, idVaga, justificativa, callback) => {

    for (const key in candidatos) {
        const email = candidatos[key].email;
        console.log(candidatos[key].email);
        console.log(candidatos[key].status);

        if (candidatos[key].status != 2) {
            const corpo =
                `
                <div style="font-family: Arial, Helvetica, sans-serif; 
                    text-align: center; 
                    display: flex; 
                    flex-direction: column; 
                    justify-content: center; 
                    align-items: center;">
                    <div style="text-align: center; width: 100%;">
                        <hr>
                        <h1 style="color: #333;">Carreiras 🐝</h1>
                        <div style="background: linear-gradient(to right, #6f00ff, #9341ff);
                            padding: 50px;
                            color: white;
                            box-shadow: 0 1px 4px #333;">
                            <div>
                                <div style="font-size: 17px">
                                    ${justificativa}
                                </div>
                                <br><br><br>
                                <small>
                                    <a target="_blank" href="https://www.carreiras.com.br" style="color: white;">
                                        www.carreiras.com.br
                                    </a>
                                </small>
                            </div>
                        </div>
                        <br>
                        <hr>
                    </div>
                </div>
            `;

            async function main() {
                const info = await transporter.sendMail({
                    from: '"Carreiras" <carreirassenai@gmail.com>',
                    to: email,
                    subject: 'Justificativa para não Contratação',
                    html: corpo
                });

                console.log("Email enviado para:", info.accepted);
            }
            main().catch(console.error);
        }
    }

    db.query('delete from vagas where id = ?', [idVaga], (err, result) => {
        if (err) {
            console.log(err.message);
            return callback(null, err.message);
        } else if (result) {
            console.log(result);
            return callback(null, result);
        }
    });
};