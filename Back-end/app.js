const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fileupload = require('express-fileupload');

// Middleware de sessão
app.use(session({
  secret: 'abnsdf2389hf92nfv90238rhj9jfaws9fh938fh',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Definir como true se estiver usando HTTPS
}));

// Use o CORS para permitir todas as origens ou especifique as origens permitidas
app.use(cors({
  origin: 'http://localhost:3000', // O domínio do seu front-end
  credentials: true // Permitir envio de cookies
}));

// Configura o body-parser para analisar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Configura o body-parser para analisar application/json
app.use(bodyParser.json());

// Configura o mecanismo de visualização como EJS
app.set('view engine', 'ejs');

// Configura o Express.js para servir arquivos estáticos da pasta 'public'
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

//habilitando upload de arquivos
app.use(fileupload());

// Use suas rotas
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
