<template>
  <v-app>
    <Navbar />

    <v-container class="sobre-nos" style="margin-bottom: 40px;">
      <div class="login-container fill-height">
        <!-- Seção de cabeçalho com fundo escurecido para melhor contraste -->
        <v-row class="header" align="center" justify="center">
          <v-col cols="12" class="text-center">
            <h1 style="color: #1f1f1f">Sobre nós</h1>
          </v-col>
        </v-row>

        <!-- Logo and Introduction Section -->
        <!-- Logo and Introduction Section -->
        <div class="logo-intro-container" style="margin-bottom: 40px;">
          <v-row class="align-center">
            <v-col cols="4" class="pr-4">
              <v-img
                class="careers-logo"
                src="../assets/logoSobre-removebg-preview.png"
                alt="Careers Logo"
              />
            </v-col>
            <v-col cols="8">
              <v-card class="intro-card pa-4">
                <v-card-title class="text-h5">Explore Our Careers</v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sit amet nulla auctor, vestibulum magna sed, convallis ex.
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </v-card-text>
                <v-card-text>
                  Our team is dedicated to delivering innovative solutions that
                  exceed our customers' expectations. We're passionate about
                  what we do, and we're looking for talented individuals to join
                  our team.
                </v-card-text>
                <v-btn class="primary" href="#"> Contate-nos! </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Missão, Visão e Valores -->
        <!-- Mission, Vision, and Values Section -->
        <div class="mission-vision-values-container" style="margin-bottom: 40px;">
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
    <div class="footer">
      <Footer />
    </div>
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
    };
  },
};
</script>

<style scoped>
.footer {
  margin: 50px;
}

.logo-intro-container {
  margin-bottom: 40px;
}

.careers-logo {
  width: 400px;
  height: 400px;
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
  margin-top: 40px;
}

.membro-equipe {
  text-align: center;
}
</style>