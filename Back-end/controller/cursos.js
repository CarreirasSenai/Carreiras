const Curso = require('../model/cursos');

exports.cursoCreate = (req, res) => {
    const id = req.session.usuario.id;
    const dados = req.body;

    Curso.cursoCreate(id, dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Curso Criado!' });
        }
    });
}

exports.cursoRead = (req, res) => {
    const idReq = req.query.id;
    const idSession = req.session.usuario.id;

    const id = idReq ? idReq : idSession;

    console.log(idReq);    
    console.log(idSession);    
    console.log(id);    

    Curso.cursoRead(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
}

exports.cursoDelete = (req, res) => {
    const { id } = req.params;

    Curso.cursoDelete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (!result) {
            return res.status(404).json({ error: "Recurso não encontrado" });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: result });
        }
    });
};

exports.cursoUpdate = (req, res) => {
    const { dados } = req.body;

    Curso.cursoUpdate(dados, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result) {
            return res.status(200).json({ sucess: true, result: 'Curso Atualizado!' });
        }
    });
}
