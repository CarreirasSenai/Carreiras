<template>
  <v-app>
    <Navbar />

    <v-container class="sobre-nos" style="margin-bottom: 40px">
      <div class="login-container fill-height">
        <!-- Seção de cabeçalho com fundo escurecido para melhor contraste -->
        <v-row class="header" align="center" justify="center">
          <v-col cols="12" sm="10" md="8" class="text-center">
            <h1 style="font-size: 30px; color: #1f1f1f">Sobre nós</h1>
          </v-col>
        </v-row>

        <!-- Logo and Introduction Section -->
        <div class="logo-intro-container" style="margin-bottom: 40px">
          <v-row class="align-center">
            <v-col cols="12" sm="6" md="4" class="pr-4">
              <v-img
                class="careers-logo"
                src="../assets/logoSobre-removebg-preview.png"
                alt="Careers Logo"
              />
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-card class="intro-card pa-4">
                <v-card-title class="text-h5"
                  >Descubra Nossas Oportunidades</v-card-title
                >
                <v-card-text>
                  Na nossa empresa, acreditamos que cada colaborador é
                  fundamental para o nosso sucesso. Estamos sempre em busca de
                  talentos que compartilhem nossa paixão por inovação e
                  excelência. Oferecemos um ambiente dinâmico onde você pode
                  crescer profissionalmente e contribuir para projetos
                  impactantes. Venha fazer parte de uma equipe que valoriza a
                  criatividade e o trabalho em equipe, e onde suas ideias podem
                  se transformar em realidade.
                </v-card-text>
                <v-card-text>
                  Está Com alguma <strong>Dúvida?</strong> Precisando de
                  <strong>Ajuda?</strong> Quer resolver algo com o
                  <strong>Suporte?</strong> Informe seu
                  <strong>E-mail</strong> e envie sua Dúvida no formulario
                  <strong>ABAIXO!</strong>
                </v-card-text>
                <div class="botao text-left">
                  <ModalContatenos ref="ModalContatenos" />
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>

    <v-divider class="my-12"></v-divider>

    <v-container>
      <div>
        <!-- Missão, Visão e Valores -->
        <div
          class="mission-vision-values-container"
          style="margin-bottom: 40px"
        >
          <v-row class="missao-visao-valores" justify="space-between">
            <v-col cols="12" md="4" class="missao">
              <v-hover v-slot:default="{ isHovering }">
                <v-card
                  :elevation="isHovering ? 8 : 2"
                  class="hover-card card-tamanho"
                >
                  <v-card-title class="primary--text">Missão</v-card-title>
                  <v-card-text>
                    Desenvolver soluções inovadoras e eficazes para nossos
                    clientes. Nossa missão é entregar resultados de alta
                    qualidade, superando as expectativas dos nossos clientes.
                    Estamos comprometidos em entender as necessidades dos nossos
                    clientes e entregar soluções personalizadas que atendam às
                    suas necessidades específicas.
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>

            <v-col cols="12" md="4" class="visao">
              <v-hover v-slot:default="{ isHovering }">
                <v-card
                  :elevation="isHovering ? 8 : 2"
                  class="hover-card card-tamanho"
                >
                  <v-card-title class="primary--text">Visão</v-card-title>
                  <v-card-text>
                    Ser líderes no mercado de tecnologia e inovação. Nossa visão
                    é ser reconhecidos como uma empresa inovadora e confiável,
                    sempre buscando melhorar e crescer. Estamos comprometidos em
                    investir em nossos colaboradores e em tecnologias de ponta
                    para garantir que nossos clientes recebam as melhores
                    soluções possíveis.
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>

            <v-col cols="12" md="4" class="valores">
              <v-hover v-slot:default="{ isHovering }">
                <v-card
                  :elevation="isHovering ? 8 : 2"
                  class="hover-card card-tamanho"
                >
                  <v-card-title class="primary--text">Valores</v-card-title>
                  <v-card-text>
                    <ul>
                      <li>
                        Inovação: Buscamos sempre melhorar e inovar em nossos
                        processos e soluções.
                      </li>
                      <li>
                        Qualidade: Entregamos resultados de alta qualidade,
                        superando as expectativas dos nossos clientes.
                      </li>
                      <li>
                        Respeito: Valorizamos a diversidade e o respeito entre
                        nossos colaboradores e clientes.
                      </li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>

    <v-divider class="my-12"></v-divider>

    <v-container>
      <!-- Seção de equipe -->
      <v-row class="equipe" align="center" justify="center">
        <v-col cols="12" class="text-center">
          <h2>Nossa Equipe</h2>
          <p>Conheça os profissionais que fazem tudo acontecer</p>
        </v-col>
        <v-row class="membros-equipe" justify="space-between">
          <v-col
            v-for="(member, index) in equipe"
            :key="index"
            cols="12"
            md="3"
            class="membro-equipe"
          >
            <v-hover v-slot:default="{ isHovering }">
              <v-card
                :elevation="isHovering ? 8 : 2"
                class="text-center team-card"
              >
                <v-avatar size="90" class="my-2">
                  <v-img :alt="member.name" :src="member.photo"></v-img>
                </v-avatar>
                <v-card-title>{{ member.name }}</v-card-title>
                <v-card-text>{{ member.position }}</v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-row>
    </v-container>

    <v-divider class="my-12"></v-divider>

    <v-container>
      <!-- FAQ Section -->
      <div class="faq-container">
        <h2 class="faq-title text-center">Perguntas Frequentes - FAQ</h2>
        <p class="text-center">
          Conheça as respostas para as perguntas mais frequentes
        </p>
        <v-row class="faq-ajuste" justify="center">
          <!-- Alterado de "space-between" para "center" -->
          <v-col
            v-for="(question, index) in faq"
            :key="index"
            cols="12"
            md="4"
            class="faq-ajuste"
          >
            <v-hover v-slot:default="{ isHovering }">
              <v-card
                :elevation="isHovering ? 8 : 2"
                class="text-center team-card"
              >
                <v-card-title class="faq-title-bold" style="font-size: 14px">{{
                  question.title
                }}</v-card-title>
                <v-card-text>{{ question.answer }}</v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      equipe: [
        {
          name: "Paula Rossini",
          position: "Gerente de Projetos",
          photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        },
        {
          name: "Rodrigo Neves",
          position: "Desenvolvedor Full-Stack",
          photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        },
        {
          name: "Felipe Wisbeck",
          position: "Analista de Sistemas",
          photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        },
        {
          name: "Thiago Mauesck",
          position: "Especialista em Segurança",
          photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        },
      ],
      faq: [
        {
          title: "Como posso criar um currículo no site?",
          answer:
            "Para criar um currículo no site, basta clicar no botão 'Criar Currículo' na página inicial e preencher o formulário com suas informações pessoais e profissionais.",
        },
        {
          title: "Como posso buscar vagas de emprego no site?",
          answer:
            "Você pode buscar vagas de emprego no site utilizando a barra de busca na página inicial. Digite palavras-chave relacionadas à vaga que você procura e selecione a localização desejada.",
        },
        {
          title: "Como entrar em contato com o suporte?",
          answer:
            " Você pode entrar em contato com a equipe de suporte do site enviando um e-mail para suporte@carreiras.com ou utilizando a página de contato no site.",
        },
        // Adicione mais perguntas frequentes conforme necessário
      ],
    };
  },
};
</script>

<style scoped>
.logo-intro-container {
  margin-bottom: 40px;
}

.careers-logo {
  width: 300px;
  height: 300px;
  border-radius: 10px;
}

.intro-card {
  border-radius: 10px;
}

.intro-card .v-card-text {
  padding: 20px;
}

.intro-card .v-btn {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #3a1c76;
  color: #ffffff;
  cursor: pointer;
}

.card-tamanho {
  height: 250px; /* ajuste a altura conforme necessário */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sobre-nos {
  max-width: 1200px;
  margin: 40px auto;
}

.header {
  background-size: cover;
  background-position: center;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-shadow: 2px 2px .5px rgba(0, 0, 0, 0.5); */
}

.header h1 {
  font-size: 48px;
  font-weight: bold;
}

.missao-visao-valores {
  margin-top: 40px;
}

.hover-card {
  transition: box-shadow 0.3s ease;
}
.hover-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.hover-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.team-card {
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-10px);
}

.valores ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.valores li {
  margin-bottom: 10px;
}

.equipe {
  padding: 50px;
}

.membro-equipe {
  text-align: center;
}

.footer {
  margin: 50px;
}

.logo-intro-container {
  margin-bottom: 40px;
}

.intro-card {
  border-radius: 10px;
}

.intro-card .v-card-text {
  padding: 20px;
}

.intro-card .v-btn {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #3a1c76;
  color: #ffffff;
  cursor: pointer;
}

.card-tamanho {
  height: 250px; /* ajuste a altura conforme necessário */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sobre-nos {
  max-width: 1200px;
  margin: 40px auto;
}

.header {
  background-size: cover;
  background-position: center;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-shadow: 2px 2px .5px rgba(0, 0, 0, 0.5); */
}

.header h1 {
  font-size: 48px;
  font-weight: bold;
}

.missao-visao-valores {
  margin-top: 40px;
}

.hover-card {
  transition: box-shadow 0.3s ease;
}
.hover-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.hover-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.team-card {
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-10px);
}

.valores ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.valores li {
  margin-bottom: 10px;
}

.equipe {
  padding: 50px;
}

.membro-equipe {
  text-align: center;
}

.faq-container {
  padding: 50px;
}

.faq-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
}

.faq-ajuste {
  text-align: center;
  margin-top: 15px;
}

.faq-title-bold {
  font-weight: bold;
}
.team-card {
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-10px);
}

@media (max-width: 600px) {
  .careers-logo {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  .intro-card {
    border-radius: 10px;
  }

  .intro-card .v-card-text {
    padding: 20px;
  }

  .intro-card .v-btn {
    background-color: #3a1c76;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>