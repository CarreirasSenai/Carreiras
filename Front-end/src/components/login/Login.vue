<template>
  <div class="h-screen d-flex align-center back-primario">
    <v-container fluid>
      <v-row no-gutters class="d-flex justify-center">
        <v-col cols="12" lg="4" md="6" sm="8" class="text-center">
          <img width="200px" class="ma-5" src="/src/assets/Logo_branco.png" alt="">
          <v-card class="elevation-12 ma-5" rounded="xl">
            <v-card-text class="text-center">
              <v-form class="ma-5 text-start" @submit.prevent="login">
                <h1 class="text-center ma-5">Faça o Login</h1>

                <v-text-field v-model="email" label="E-mail" type="email" @keyup.enter="login"></v-text-field>
                <v-text-field v-model="password" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'" @click:append-inner="showPassword = !showPassword"
                  label="Senha" @keyup.enter="login"></v-text-field>

                <div class="text-center text-red mb-4" id="aviso-invalido" v-if="mensagem">{{ mensagem }}</div>

                <v-btn class="bg-purple-darken-4" @click="login" @keyup.enter="login" block>Entrar</v-btn>
              </v-form>
              <v-row class="ma-2">
                <v-col cols="6">
                  <p class="cor-primaria cursor-pointer text-start" @click="respostaGrupo">Esqueceu a
                    senha?</p>
                </v-col>
                <v-col cols="6">
                  <p class="cor-primaria cursor-pointer text-end" @click="goToSignUp">Não tem uma conta? Cadastre-se.
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import axios from 'axios';

export default {
  data() {
    return {
      email: 'pibipax668@skrak.com',
      emailRules: [
        (v) => !!v || 'E-mail requerido',
        (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      password: '12345678Ww@',
      showPassword: false,
      passwordRules: [(v) => !!v || 'Senha requerida'],
      resposta: this.$route.query.resposta,
      mensagem: '',
    };
  },

  computed: {
    user() { return useCandidatoStore(); },
  },

  methods: {
    async login() {
      try {
        const urlLogin = window.location.href;
        const path = urlLogin.includes("empresa") ? "empresa" : "candidato"

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${path}/login`, {
          email: this.email,
          password: this.password
        }, { withCredentials: true });

        localStorage.setItem("grupo", this.resposta); // Resposta 'candidato' ou 'empresa' enviada a store para receber os dados
        this.$router.push('/'); // Envia a Home index.vue

        console.log('Login bem-sucedido', response.data);
      } catch (error) {
        console.error('Erro no login', error.response.data);
        this.mensagem = error.response.data.aviso;
      }
    },

    goToSignUp() {
      if (window.location.href.includes("candidato")) {
        this.$router.push({ path: '/cadastro-candidato' });
      } else {
        this.$router.push({ path: '/cadastro-empresa' });
      }
    },

    respostaGrupo() {
      this.$router.push({ path: '/redefinir-senha', query: { resposta: this.resposta } });
    },
  },

  mounted() {
    this.$route.query.resposta;
  },
};

</script>

<style scoped></style>