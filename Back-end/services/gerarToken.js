const crypto = require('crypto');

exports.gerarToken = () => {
  const token = crypto.randomBytes(32).toString('hex'); // Gera um token de 64 caracteres (32 bytes)
  console.log(token);
  return token;
};