const Perfil = require("../model/perfil");
const path = require('path');

exports.perfilUpdate = (req, res) => {

    // const id = 1;
    // const grupo = 'candidato';

    const id = req.session.usuario.id;
    const grupo = req.session.usuario.grupo;
    const descricao = req.body.descricao;

    console.log(descricao);

    if (descricao) {
        Perfil.descricaoUpdate(descricao, grupo, id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else if (result) {
                return res.json({ success: 'Descrição Atualizada!' });
            }
        });

    } else if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Nenhum arquivo foi enviado.');

    } else {
        const foto = req.files.foto; // Acessa a foto
        const capa = req.files.capa; // Acessa a capa

        console.log('foto:', foto);
        console.log('capa:', capa);

        // Define o diretório de uploads
        const diretorio = path.join(__dirname, '..', 'public', 'uploads', 'perfil');

        if (foto) {
            const extensao = foto.name.split('.').pop();
            var fotoNome = `perfil-foto-userId-${id}.${extensao}`;
            foto.mv(path.join(diretorio, fotoNome));
        }

        if (capa) {
            const extensao = capa.name.split('.').pop();
            var capaNome = `perfil-capa-userId-${id}.${extensao}`;
            capa.mv(path.join(diretorio, capaNome));
        }

        Perfil.perfilUpdate(fotoNome, capaNome, grupo, id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else if (result) {
                return res.json({ success: 'Perfil Atualizado!' });
            }
        });
    }
};