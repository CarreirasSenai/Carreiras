<template>
  <Navbar />
  <v-container class="d-flex flex-column ga-8 pa-6 mt-5 mb-15">

    <div class="d-flex align-center ga-1">
      <h1 style="font-size: clamp(17px, 4vw, 25px);">
        Usuários do Sistema
        <v-icon size="x-small">
          mdi-information
        </v-icon>
        <v-tooltip activator="parent" location="start">
          <strong>Permissões:</strong> <br>
          Todas as permissões (SUPER) <br>
          Cadastro de usuários (SUPER) <br>
          Controle dos próprios dados cadastrais (TODOS) <br>
          Controle total de empresas e candidatos (SUPER e ADM) <br>
          Vizualização e leitura (TODOS)
        </v-tooltip>
      </h1>
      <v-spacer></v-spacer>
      <CadUsuarioAdmin v-if="usuario.dadosUser.tipo_admin === 'super'" :MostrarUsuarios="mostrarUsuarios" />
    </div>

    <v-text-field v-model="busca" :loading="loading" append-inner-icon="mdi-magnify" density="compact"
      label="Procure um Usuário" variant="underlined" hide-details single-line @click:append-inner="searchUser"
      @keyup.enter="searchUser" />

    <v-card v-for="user in usuarios" :key="user">
      <v-card-text>
        <v-row align="center">

          <v-col cols="12" sm="4" class="d-flex align-center ga-2">
            <v-avatar color="surface-variant" image="/src/assets/avatar.png" v-if="!user.foto">
            </v-avatar>
            <v-avatar color="surface-variant" :image="user.foto" v-if="user.foto">
            </v-avatar>
            <div>
              <h3>{{ user.nome }}</h3>
              <p>{{ user.email }}</p>
            </div>
          </v-col>

          <!-- <v-col cols="9" sm="3">
            <div class="ma-1">
              <h3>{{ user.nome }}</h3>
              <p>{{ user.email }}</p>
            </div>
          </v-col> -->

          <v-col cols="12" sm="3" class="text-align">
            <p>
              <v-icon>mdi-cellphone</v-icon>
              {{ user.celular }}
            </p>
          </v-col>

          <v-col cols="4" sm="4" class="text-align text-uppercase">
            <v-chip size="small" :color="colorTipoUser(user.tipo_admin)">{{ user.tipo_admin }}</v-chip>
          </v-col>

          <v-col cols="8" sm="1" class="text-end">
            <EditarCadUsuarioAdmin v-if="usuario.dadosUser.tipo_admin === 'super' || usuario.dadosUser.id === user.id"
              :MostrarUsuarios="mostrarUsuarios" :User="user" />
            <v-btn variant="plain" icon="mdi mdi-pencil" v-else @click="showSnackbar = true">
            </v-btn>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-container>

  <v-snackbar location="top right" v-model="showSnackbar" :timeout="4000" color="red" elevation="24">
    <div class="text-center">Você é <span class="text-uppercase rounded-xl pa-1 ma-1"
        :class="'bg-' + colorTipoUser(usuario.dadosUser.tipo_admin)">{{
          usuario.dadosUser.tipo_admin }}</span> não tem acesso! 👎😂</div>
  </v-snackbar>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useCandidatoStore } from "@/stores/candidato";
import { useResolucaoDesktop } from "@/stores/resolucao";

import axios from "axios";

export default {
  data: () => ({
    showSnackbar: false,
    loading: false,
    dialog: false,
    usuarios: '',
    busca: ''
  }),
  computed: {
    auth() {
      return useAuthStore();
    },
    usuario() {
      return useCandidatoStore();
    },
    resolucao() {
      return useResolucaoDesktop();
    }
  },
  created() {
    this.auth.autenticacao();
  },
  mounted() {
    this.mostrarUsuarios();
  },
  methods: {
    async mostrarUsuarios() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/read/all`, {
          withCredentials: true
        });

        console.log(response.data);
        this.usuarios = response.data.usuarios;

      } catch (error) {
        console.log(error.data);
      }
    },

    async searchUser() {
      console.clear();
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/pesquisa`, {
          params: {
            busca: this.busca
          },
          withCredentials: true
        });

        console.log(response.data);
        this.usuarios = response.data.result;

      } catch (error) {
        console.error('Erro na busca:', error.response.data);
        this.usuarios = '';
      }
    },

    colorTipoUser(value) {
      if (value === 'adm') {
        return 'success';
      } else if (value === 'user') {
        return 'primary';
      } else if (value === 'super') {
        return 'error';
      }
    }
  },
};
</script>

<style>
* {
  /* border: 1px solid red; */
}

.text-align {
  text-align: center;
}

@media(max-width:600px) {
  .text-align {
    text-align: left;
  }
}
</style>