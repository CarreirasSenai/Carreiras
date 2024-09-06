<template>
  <v-app>
    <Navbar />

    <v-container class="sobre-nos">
      <!-- Seção de cabeçalho com fundo escurecido para melhor contraste -->
      <v-row class="header" align="center" justify="center">
        <v-col cols="12" class="text-center">
          <h1>Sobre Carreiras</h1>
        </v-col>
      </v-row>

      <!-- Missão, Visão e Valores -->
      <v-row class="missao-visao-valores" justify="space-between">
        <v-col cols="12" md="4" class="missao">
          <v-hover v-slot:default="{ isHovering }">
            <v-card
              :elevation="isHovering ? 8 : 2"
              class="hover-card card-tamanho"
            >
              <v-card-title class="primary--text">Missão</v-card-title>
              <v-card-text>
                Desenvolver soluções inovadoras e eficazes para nossos clientes.
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
                Ser líderes no mercado de tecnologia e inovação.
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
                  <li>Inovação</li>
                  <li>Qualidade</li>
                  <li>Respeito</li>
                  <li>Compromisso</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <!-- Divisor para separar as seções -->
      <v-divider class="my-12"></v-divider>

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
  background-image: url("imagem-de-fundo.jpg");
  background-size: cover;
  background-position: center;
  height: 150px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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