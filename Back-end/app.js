const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fileupload = require('express-fileupload');
require('dotenv').config();

// Middleware de sessão
app.use(session({
  secret: 'abnsdf2389hf92nfv90238rhj9jfaws9fh938fh',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Definir como true se estiver usando HTTPS
}));

// Use o CORS para permitir todas as origens ou especifique as origens permitidas
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // O domínio do seu front-end
  credentials: true // Permitir envio de cookies
}));

//habilitando upload de arquivos
app.use(fileupload());

// Configura o body-parser para analisar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Configura o body-parser para analisar application/json
app.use(bodyParser.json());

// Configura o mecanismo de visualização como EJS
app.set('view engine', 'ejs');

// Configura o Express.js para servir arquivos estáticos da pasta 'public'
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Use suas rotas
app.use('/', routes);

// Extrair a porta da URL de BACKEND_URL
const backendUrl = new URL(process.env.BACKEND_URL || 'http://localhost:4000');
const port = backendUrl.port || 4000; // Se não tiver uma porta definida, usa 4000 como fallback

app.listen(port, () => {
  console.log(`Server is running at ${backendUrl.origin}`);
});
