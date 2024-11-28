<template>
  <Navbar />

  <div class="d-flex justify-center align-center pa-15 flex-wrap ga-5" style="min-height: 90vh;">
    <img src="../assets/empresas/1.png" alt="sobre-o-carreiras"
      style="width: 100%; max-width: 600px; min-width: 300px;">
    <div class="d-flex flex-column align-start ga-1" style="width: 100%; max-width: 600px; min-width: 300px;">
      <h5 class="text-uppercase bg-deep-purple-accent-3 px-2 rounded">Sobre Nós</h5>
      <h1>Descubra Nossas Oportunidades</h1>
      <p>Na nossa empresa, acreditamos que cada colaborador é
        fundamental para o nosso sucesso. Estamos sempre em busca de
        talentos que compartilhem nossa paixão por inovação e
        excelência. Oferecemos um ambiente dinâmico onde você pode
        crescer profissionalmente e contribuir para projetos
        impactantes. Venha fazer parte de uma equipe que valoriza a
        criatividade e o trabalho em equipe, e onde suas ideias podem
        se transformar em realidade.</p>
      <a href="#pilares">
        <v-btn class="mt-3" color="deep-purple-accent-3" variant="outlined">Ver Mais</v-btn>
      </a>
    </div>
  </div>

  <v-divider></v-divider>

  <div id="pilares" class="d-flex justify-center align-center pa-10 flex-wrap ga-5" style="min-height: 70vh;">
    <div class="d-flex flex-column align-center">
      <h5 class="text-uppercase bg-deep-purple-accent-3 px-2 rounded">Nossos Pilares</h5>
      <h1>Propósito e Compromisso</h1>
    </div>
    <div class="d-flex justify-center align-center flex-wrap">
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center pa-2">
          <v-icon class="text-h1" color="deep-purple-accent-3">mdi-target</v-icon>
          <div>
            <v-card-title class="primary--text">Missão</v-card-title>
            <v-card-text>
              Desenvolver soluções inovadoras e eficazes para nossos
              clientes. Nossa missão é entregar resultados de alta
              qualidade, superando as expectativas dos nossos clientes.
              Estamos comprometidos em entender as necessidades dos nossos
              clientes e entregar soluções personalizadas que atendam às
              suas necessidades específicas.
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center pa-2" style="min-height: 260px;">
          <v-icon class="text-h1" color="deep-purple-accent-3">mdi-eye</v-icon>
          <div>
            <v-card-title class="primary--text">Visão</v-card-title>
            <v-card-text>
              Ser líder no mercado de tecnologia e inovação. Nossa visão
              é ser reconhecidos como uma empresa inovadora e confiável,
              sempre buscando melhorar e crescer. Estamos comprometidos em
              investir em nossos colaboradores e em tecnologias de ponta
              para garantir que nossos clientes recebam as melhores
              soluções possíveis.
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center pa-2">
          <v-icon class="text-h1" color="deep-purple-accent-3">mdi-handshake</v-icon>
          <div>
            <v-card-title class="primary--text">Valores</v-card-title>
            <v-card-text>
              Inovação: Buscamos sempre melhorar e inovar em nossos
              processos e soluções.
              <br>
              Qualidade: Entregamos resultados de alta qualidade,
              superando as expectativas dos nossos clientes.
              <br>
              Respeito: Valorizamos a diversidade e o respeito entre
              nossos colaboradores e clientes.
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </div>
  </div>

  <v-divider></v-divider>

  <div class="d-flex justify-center align-center pa-10 flex-wrap ga-5" style="min-height: 70vh;">
    <div class="d-flex flex-column align-center">
      <h5 class="text-uppercase bg-deep-purple-accent-3 px-2 rounded">Nossa Equipe</h5>
      <h1>Conheça os profissionais que fazem tudo acontecer</h1>
    </div>
    <v-row class="membros-equipe" justify="space-between">
      <v-col v-for="(member, index) in equipe" :key="index" cols="12" md="3" class="membro-equipe">
        <v-hover v-slot:default="{ isHovering }">
          <v-card :elevation="isHovering ? 8 : 2" class="text-center team-card">
            <v-avatar size="90" class="my-2">
              <v-img :alt="member.name" :src="member.photo"></v-img>
            </v-avatar>
            <v-card-title>{{ member.name }}</v-card-title>
            <v-card-text>{{ member.position }}</v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>

  <Footer />
</template>

<style>
* {
  /* border: 1px solid red; */
}
</style>

<script>
export default {
  data() {
    return {
      equipe: [
        {
          name: "Paula Rossini",
          position: "Líder de Projetos",
          photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        },
        {
          name: "Thiago Mauesck",
          position: "Desenvolvedor Full-Stack",
          photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        },
        {
          name: "Rodrigo Neves",
          position: "Desenvolvedor Full-Stack",
          photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        },
        {
          name: "Felipe Wisbeck",
          position: "Desenvolvedor Front-End",
          photo: "https://cdn.vuetifyjs.com/images/john.jpg",
        }        
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