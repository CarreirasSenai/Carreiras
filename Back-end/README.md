1 - Importar banco:

Abrir o MySQL Workbench -> Navbar (Server) -> Data Import -> Seleciona (Import From Self-Contained File) -> Navega até a pasta config no backend e seleciona DBcarreiras -> Start Import -> Atualiza pra ver o banco e tabelas.

2 - Npm install em \Carreiras\Back-end>

3 - nodemon node app.js em \Carreiras\Back-end>

Tratamento de Erros:

1xx: HTTP codes iniciados em 1 são informativos:
102: PROCESSING.

2xx: HTTP codes iniciados com 2 são de sucesso:
200: SUCCESS;
201: CREATED.

3xx: HTTP codes iniciados em 3 são de redirecionamento:
301: MOVED PERMANENTLY;
302: MOVED.

4xx: HTTP codes iniciados em 4 são de erros do cliente:
400: BAD REQUEST;
401: UNAUTHORIZED;
404: NOT FOUND.

5xx: HTTP codes iniciados em 5 são erros do servidor:
500: INTERNAL SERVER ERROR.

// modificações feita no db (area e profissao)
