<template>
  <div>
    <ChatLayout ref="chatLayout" />
    <!-- <ProgressLoader ref="showProgress" /> -->
    <v-container>
      <v-app-bar scroll-behavior="elevate">
        <div class="navbar-container position-relative">
          <a href="/" class="d-flex justify-center align-center">
            <img class="carreiras-logo" src="../../assets/logo.png">
          </a>
          <!-- Aqui o Menu com opções visiveis que o sestito pediu e tbm a versão mob -->
          <div v-if="user.visibilidadeNaoLogado">
            <div v-if="visibilidadeMenuInicial" class="d-flex align-center ga-15">
              <div class="d-flex ga-5 position-absolute left-0 right-0 justify-center">
                <v-btn variant="text" rounded to="/" class="text-none">Home</v-btn>
                <v-btn variant="text" rounded to="/sobre" class="text-none">Sobre o Carreiras</v-btn>
                <v-btn variant="text" rounded to="/contato" class="text-none">Contacte-nos</v-btn>
                <v-btn variant="text" rounded to="/politica-de-privacidade" class="text-none">Política de
                  privacidade</v-btn>
              </div>
              <v-menu :location="location">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" class="bg-deep-purple-accent-3 pa-2 ma-2 elevation-2 rounded-xl">
                    <div class="d-flex align-center ga-2">
                      <v-icon>mdi-menu-down</v-icon>
                      Conta
                      <v-icon>mdi-account</v-icon>
                    </div>
                  </v-btn>
                </template>
                <v-list class="d-flex flex-column ga-2 pa-2 mt-2">
                  <v-btn class="w-100" variant="text" prepend-icon="mdi-login"
                    to="/empresa-candidato?resposta=entrar">Entrar</v-btn>
                  <v-divider></v-divider>
                  <v-btn class="w-100" variant="text" prepend-icon="mdi-account-plus"
                    to="/empresa-candidato?resposta=cadastro">Cadastrar</v-btn>
                  <v-divider></v-divider>
                  <v-btn class="w-100" variant="text" prepend-icon="mdi-shield-account"
                    to="/login?resposta=admin">Adm</v-btn>
                  <v-divider></v-divider>
                  <v-btn class="w-100" variant="text" prepend-icon="mdi-help-circle">Faq</v-btn>
                </v-list>
              </v-menu>
            </div>
            <MenuMobile v-if="visibilidadeMenuMobilie" />
          </div>
          <!-- <NavbarLogado /> -->
          <div class="user-account-avatar d-flex align-center ga-2 mr-2" v-if="user.visibilidadeLogado">
            <h1 id="email-navbar" class="text-grey-darken-4 text-subtitle-2">{{ user.dadosUser.email }}</h1>
            <div class="d-flex ga-5 position-absolute left-0 right-0 justify-center" v-if="visibilidadeMenuInicial">
              <v-btn variant="text" rounded to="/" class="text-none">Home</v-btn>
              <v-btn variant="text" rounded to="/sobre" class="text-none">Sobre o Carreiras</v-btn>
              <v-btn variant="text" rounded to="/contato" class="text-none">Contacte-nos</v-btn>
              <v-btn variant="text" rounded to="/politica-de-privacidade" class="text-none">Política de
                privacidade</v-btn>
            </div>
            <v-menu min-width="200px" rounded>
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props">
                  <v-avatar v-if="user.dadosUser.foto" :image="user.dadosUser.foto" size="45"></v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <div class="mx-auto text-center">
                    <v-avatar v-if="user.dadosUser.foto" :image="user.dadosUser.foto" size="45"></v-avatar>
                    <h3>{{ user.dadosUser.nome_completo }}</h3>
                    <p class="text-caption mt-1">
                      {{ user.dadosUser.email }}
                    </p>

                    <v-divider class="my-2"></v-divider>
                    <v-btn variant="text" rounded to="/">
                      Home
                    </v-btn>

                    <v-divider class="my-2" v-if="user.grupo === 'candidato' || user.grupo === 'empresa'"></v-divider>
                    <v-btn variant="text" rounded v-if="user.grupo === 'candidato' || user.grupo === 'empresa'"
                      :to="user.grupo === 'candidato' ? '/agenda-candidato' : 'agenda-empresa'">
                      Agenda
                    </v-btn>

                    <v-divider class="my-2" v-if="user.grupo === 'candidato'"></v-divider>
                    <v-btn variant="text" rounded v-if="user.grupo === 'candidato'" to="minhas-vagas">Minhas
                      Vagas</v-btn>

                    <v-divider class="my-2" v-if="user.grupo === 'candidato' || user.grupo === 'empresa'"></v-divider>
                    <v-btn variant="text" rounded to="/perfil-candidato"
                      v-if="user.grupo === 'candidato'">Curriculo</v-btn>
                    <v-btn variant="text" rounded v-if="user.grupo === 'empresa'" class="pa-0">
                      <a class="pl-4 pr-4" href="/perfil-empresa">Perfil</a>
                      <!-- Rodrigueira eu sei que tu odeia um "href".
                      No entando eu resolvi 3 bugs relacionados ao perfil da empresa 
                      só fazendo a página recarregar, então por hora deixa assim. 😂 -->
                      <a href="../../assets/meme.png"></a>
                    </v-btn>

                    <!-- <v-divider class="my-2" v-if="user.grupo === 'admin'"></v-divider>
                    <v-btn variant="text" rounded v-if="user.grupo === 'admin'">Painel</v-btn> -->

                    <v-divider class="my-2" v-if="user.grupo === 'admin'"></v-divider>
                    <v-btn variant="text" rounded to="lista-vagas" v-if="user.grupo === 'admin'">Lista de
                      Vagas</v-btn>

                    <v-divider class="my-2" v-if="user.grupo === 'admin'"></v-divider>
                    <v-btn variant="text" rounded to="lista-empresas" v-if="user.grupo === 'admin'">
                      Empresas</v-btn>

                    <v-divider class="my-2" v-if="user.grupo === 'admin'"></v-divider>
                    <v-btn variant="text" to="lista-candidatos" rounded v-if="user.grupo === 'admin'">
                      Candidatos</v-btn>

                    <v-divider class="my-2" v-if="user.grupo === 'admin'"></v-divider>
                    <v-btn variant="text" rounded to="lista-usuarios" v-if="user.grupo === 'admin'">
                      Usuários</v-btn>

                    <v-divider class="my-2"></v-divider>
                    <v-btn variant="text" rounded prepend-icon="mdi-logout" @click="logout">Sair</v-btn>

                    <!-- <v-btn variant="text" @click="triggerAbrirChatHome">Chat</v-btn>
                                      <v-divider class="my-2"></v-divider> -->
                  </div>
                </v-card-text>
              </v-card>
            </v-menu>
          </div>
        </div>
      </v-app-bar>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { useCandidatoStore } from '@/stores/candidato';

export default {
  data: () => ({
    visibilidadeMenuInicial: true,
    visibilidadeMenuMobilie: false,
    location: 'bottom',
  }),

  computed: {
    user() {
      return useCandidatoStore();
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.user.userLogado();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    redirectToCad() {
      this.$router.push('/cadastro-candidato');
      this.$router.push('/');
      this.$refs.showProgress.showProgressLoader();
    },
    triggerAbrirChatHome() {
      // Access the ChatLayout component and call its method
      this.$refs.chatLayout.abrirChatHome();
    },

    // Fazer o Logout
    async logout() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
          withCredentials: true  // Importante: enviar cookies com a requisição
        });

        localStorage.removeItem("grupo");
        console.log(response.data);
        window.location.href = '/';

      } catch (error) {
        console.error('Erro ao efetuar Logout', error.response);
      }
    },

    handleResize() {
      if (window.innerWidth < 1000) {
        this.visibilidadeMenuInicial = false;
        this.visibilidadeMenuMobilie = true;
      } else {
        this.visibilidadeMenuInicial = true;
        this.visibilidadeMenuMobilie = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-app-bar {
  border-bottom: 1px solid #C3C3C3 !important;
}

.navbar-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.carreiras-logo {
  width: 150px;
  margin-left: 10px;
}

.sign-in-v-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  gap: 10px;
}

.adm-btn {
  border: thin solid #3A1C76 !important;
  color: #3A1C76 !important;
}

.v-btn a {
  text-decoration: none;
  color: black;
}

@media(max-width:800px) {
  #email-navbar {
    display: none;
  }
}
</style>