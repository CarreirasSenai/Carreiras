<template>
  <v-app>
    <Navbar />

    <v-container class="sobre-nos" style="margin-bottom: 40px">
      <div class="login-container fill-height">
        <!-- Seção de cabeçalho com fundo escurecido para melhor contraste -->
        <v-row class="header" align="center" justify="center">
          <v-col cols="12" sm="10" md="8" class="text-center">
            <h1 style="font-size: 30px; color: #1f1f1f">Suporte Carreiras</h1>
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
                  >Está com álgum Problema?  </v-card-title
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