README  

Projeto Carreiras 

O Projeto Carreiras é uma plataforma de balcão de empregos projetada para conectar empresas e candidatos, otimizando o processo de recrutamento. A aplicação permite:


Passo a Passo para Instalação dos Aplicativos: 

-1. Instalar o Git Bash 
-
-Acesse o site oficial do Git: https://git-scm.com/. 

-Clique no botão Download. 

-Escolha a versão correspondente ao seu sistema operacional (Windows, macOS ou Linux). 

-Execute o instalador baixado. 

-No Windows, siga os seguintes passos: 

-Aceite os termos de licença. 

-Mantenha as configurações padrão sugeridas pelo instalador. 

-Clique em Next até chegar em Install e aguarde a instalação. 

-Após a instalação, abra o Git Bash para confirmar a instalação com o comando: git --version 
 
-O terminal deve retornar algo como git version 2.44.0. 

 

-2. Instalar o MySQL Workbench 8.0 e MySQL Server 8.0.36
-

-Acesse o site oficial do MySQL: https://dev.mysql.com/downloads/. 

-Clique em MySQL Community (GPL) Downloads e selecione MySQL Installer for Windows (ou a opção correspondente ao seu sistema operacional). 

-Faça o download e execute o instalador. 

-Durante a instalação: 

-Escolha a opção Developer Default para incluir o MySQL Server, Workbench e ferramentas associadas. 

-Siga as instruções e configure o nome de usuário e a senha para o MySQL Server (lembre-se da senha, pois será usada no projeto). 

-Após a instalação: 

-Abra o MySQL Workbench e conecte-se ao banco de dados usando o host 127.0.0.1 e a senha configurada. 

-Confirme as versões: 

-No MySQL Workbench, verifique a versão em Help > About Workbench (deve ser 8.0). 

-No terminal, confirme a versão do MySQL Server com:  

-mysql –version 

 

-3. Importar Banco de Dados no MySQL Workbench 
-
-Abrir o MySQL Workbench 

-Inicie o MySQL Workbench e conecte-se ao servidor de banco de dados local. 

-Use as credenciais que você configurou durante a instalação: 
 host: localhost, usuário: root, senha: root, port: 3306 

-Acessar a opção de Importação de Dados 

-Na barra de navegação superior, clique em Server > Data Import. 

-Isso abrirá a interface para importação de dados. 

-Selecionar o Arquivo de Banco de Dados 

-Na seção Import Options, marque a opção Import From Self-Contained File. 

-Clique no botão de navegação (...) e localize o arquivo DBcarreiras.sql, que está dentro da pasta config no diretório do backend do projeto. 

-Escolher o Banco de Dados para Importação 

-Na seção Default Schema to be Imported To, escolha o banco de dados onde deseja importar os dados. 

-Caso ainda não exista um banco de dados, clique em New e crie um banco com o nome apropriado (ex.: carreiras). 

-Iniciar a Importação 

-Clique em Start Import para iniciar o processo. 

-Aguarde até que a barra de progresso indique que a importação foi concluída com sucesso. 

-Verificar o Banco de Dados Importado 

-Após a importação, clique no botão Refresh na aba lateral esquerda, onde estão listados os esquemas (bancos de dados). 

-Confirme se o banco de dados e suas tabelas foram importados corretamente 

 

 
## Caso deseja importar pelo arquivo do banco a parte

1. Abrir o MySQL Workbench 

-Inicie o MySQL Workbench e conecte-se ao servidor local usando suas credenciais. 


2. Selecionar o Banco de Dados carreiras 

-Localize a aba lateral esquerda onde estão os esquemas (schemas). 

-Clique com o botão direito sobre o banco de dados carreiras e selecione Set as Default Schema para defini-lo como padrão. 


3. Adicione as tabelas todos os aquivos do pasta 'dump_carreiras_estrutura_dados_db'

-Clique em File > New Query Tab para abrir uma nova aba de consulta SQL. 

-Crie o Banco de Dados "carreiras" antes de tudo, como: 
CREATE DATABASE  IF NOT EXISTS `carreiras` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `carreiras`;

Para criar cada tabela utilizada pelo sistema, crie as tabelas na seguinte ordem:

 Primeiras tabelas (a ordem independe):user_candidato, user_empresa, user_admin.
 
 Tabelas que dependem de user_candidato (a ordem independe):curso, experiencia, formacao, habilidade.

 Tabelas que dependem de user_empresa: vagas
 
 Tabelas que dependem de user_empresa e user_candidato (a ordem independe):perfil, agendamento, mensagem.
 
 Tabelas que dependem de vagas: questionario

 Tabelas que dependem de user_candidato e vagas: candidatura.
 
 Tabelas que dependem de vagas, user_candidato e questionario: questionario_respostas

-Clique no botão Execute (ícone de raio) para rodar a consulta. 

5. Verificar os Dados 

-Execute o seguinte comando para visualizar os registros na tabela: 

SELECT * FROM `user_candidato`; 

-Confira os dados exibidos na aba de resultados para garantir que tudo foi importado corretamente. 

-Pronto! A tabela user_candidato foi criada e os dados foram importados com sucesso no banco de dados carreiras. 
 

 
 

-3. Instalar o Visual Studio Code (VSCode) 
-
-Acesse o site oficial do VSCode: https://code.visualstudio.com/. 

-Clique no botão Download e faça o download. 

-Execute o instalador e siga as instruções: 

-Mantenha as opções padrão. 

-Se solicitado, permita que o VSCode seja adicionado ao Path para facilitar seu uso no terminal. 

-Após a instalação, abra o VSCode e confirme a versão: 

-Vá em Help > About (ou Ajuda > Sobre) e verifique a versão (deve ser 1.95). 

 

-4. Instalar a Extensão Vetur no VSCode 
-
-Abra o Visual Studio Code. 

-Vá até a aba de extensões (ícone de quadrado no lado esquerdo ou pressione Ctrl+Shift+X). 

-Pesquise por Vetur. 

-Clique em Install na extensão Vetur (v0.37.3) de Pine Wu. 

-Após a instalação, reinicie o VSCode. 

 

-5. Instalar o Node.js v21.7.0 
-

-Acesse o site oficial do Node.js: https://nodejs.org/. 

-Faça o download da versão LTS recomendada. 

-Execute o instalador e siga as instruções: 

-Marque a opção para adicionar o Node.js ao Path. 

-Complete a instalação. 

-Após a instalação, confirme se o Node.js foi instalado corretamente: 

-node --version 
 

-Deve retornar a versão instalada (Node.js v21.7.0). 

-Confirme também a versão do NPM (Node Package Manager): 

-npm –version 

 

 
-6. Instalar as Dependências do Projeto (Node.js v21.7.0) 
-
-Abra o terminal no diretório do projeto. 

-Execute o comando para instalar as dependências: 

-Npm install 
 
-Confirme se os pacotes foram instalados corretamente verificando a pasta node_modules no diretório do projeto. 

 


-##Passo a Passo para Rodar o projeto 
-
-Após instalar tudo e fazer todos os passos citados anteriores; 

-Crie uma pasta de em algum local de sua escolha; 

-Vá para a página do github do Projeto Carreiras; 

-Você verá um botão escrito “Code” em verde, clique no botão vá em HTTPS e clone o link que aparece para você; 

-Agora, vá na pasta que você criou, clique 2 vezes nela a abrindo. 

-Clique com o botão direito do mouse no meio dessa pasta vazia, com a tabela do botão direito aberta, procure por “Git Bash Here”, clique neste ícone. 

-Agora para você deve ter surgido um terminal em verde com algumas poucas informações do seu computador, se prepare para digitar; 

-Digite: “Git clone + o link que você copiou”, o link deve ser colado clicando com o botão direito do mouse e ir na opção de “Paste”, o link colado por você deve ser o link que pegamos no passo 4, clique Enter; 

-Agora deve estar sendo adicionado arquivos para dentro desta pasta que você criou anteriormente; 

-Neste passo, digite “code .”, não esqueça do espaço entre code, e o ponto final, so dessa maneira irá abrir o vsCode diretamente nesta pasta. 

-Com a tela do vscode aberta no projeto, você irá clicar ctrl + J, este comado irá abrir o terminal do vscode, você agora deve ir na opção que é um “+” nas opções de terminais e escolha o “Git bash”; 

-Desta maneira agora você escolheu o terminal que vamos usar, você agora deve, digitar: “cd Ca” e clicar na tecla “Tab”, desta maneira se o terminal retornar “cd Carreiras/”, você clica “enter”, você agora ira digitar: “cd Front” + ”Tab”, se aparecer “cd Front-end/”, você clica “Enter”; 

-Desta maneira você agora tem um terminal somente para a parte de Front-End do projeto e vamos utilizar daqui a pouco; 

-Agora abra um novo terminal, deixe o terminal de front end de lado, vamos repetir o que fizemos antes, só que agora com o Back end: você agora deve digitar: “cd Ca” e clicar na tecla “Tab”, desta maneira se o terminal retornar “cd Carreiras/”, você clica “enter”, você agora ira digitar: “cd back” + ”Tab”, se aparecer “cd Back-end/”, você clica “Enter”; 

-Desta maneira temos os dois Terminais que precisamos para colocar os comandos e fazer o projeto funcionar, estando ainda no back-end, digite no terminal “npm install”, após as dependências forem baixadas, digite no terminal “nodemon node app.js”; 

-Se tudo der certo voce agora possui o back-end rodando normalmente, se houver algum problema e as dependecias nao forem instaladas, uma pequena pesquisa na internet ja ira resolver o problema; 

-Agora com o terminal do front-end, vamos somente digitar no terminal “npm run dev”, desta maneira o front end ja deve estar rodando e online. Se houver algum problema, uma pequena pesquisa na internet ja ira resolver o problema; 

-Agora abra seu navegador, e digite o link em azul que aparece no seu terminal do front end. Algo como “https:localhost/3000.” 

-Desta maneira voce deve estar visualizando a tela principal do Site Carreiras e agora crie seu cadastro e explore o site.  
