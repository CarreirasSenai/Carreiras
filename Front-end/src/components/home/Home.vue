<template>
  <v-card variant="elevated"
    class="text-center bg-deep-purple-accent-4 ma-5 mb-3 pt-10 pb-10 pl-5 pr-5 rounded-lg elevation-2">
    <h1 style="font-size: 4vh;">Encontre uma carreira para você {{ user }} !</h1>
    <v-row>
      <v-card-text class="d-flex justify-center">
        <v-col cols="12" sm="8" md="8">
          <v-form @submit.prevent="pesquisar">
            <v-text-field v-model="pesquisa" :loading="loading" append-inner-icon="mdi-magnify" density="compact"
              label="Digite um cargo, cidade, estado." variant="solo" hide-details single-line
              @click:append-inner="onClick" @keyup.enter="onEnter">
            </v-text-field>
          </v-form>
        </v-col>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    loaded: false,
    loading: false,
    pesquisa: '',
    user: '',
  }),

  mounted() {
    // Chama a função userLogado quando o componente for montado
    this.userLogado();
  },

  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
        this.pesquisar();
      }, 2000)
    },

    onEnter() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },

    async pesquisar() {
      try {
        const response = await axios.get('http://localhost:4000/vaga/pesquisa', {
          pesquisa: this.pesquisa,
        });
        console.log('Busca enviada!', response.data);

      } catch (error) {
        console.log('Erro ao enviar busca!', error.response);
      };
    },

    async userLogado() {
      try {
        const response = await axios.get('http://localhost:4000/candidato/read', {
          withCredentials: true
        });
        this.user = response.data.usuario.nome_completo;
      } catch (error) {
        console.error('Erro ao obter dados do usuário', error.response ? error.response.data : error.message);
      }
    },
  },
}
</script>