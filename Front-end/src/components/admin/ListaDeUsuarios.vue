<template>
  <Navbar />
  <v-container class="d-flex flex-column ga-8 pa-6 mt-5">

    <div class="d-flex align-center ga-1">
      <h1 style="font-size: 3vh;">Usuários do Sistema</h1>
      <v-spacer></v-spacer>
      <CadUsuarioAdmin v-if="usuario.dadosUser.tipo_admin === 'super'" :MostrarUsuarios="mostrarUsuarios" />
      <v-btn class="bg-deep-purple-accent-3" v-if="usuario.dadosUser.tipo_admin != 'super'"
        @click="showSnackbar = true">
        Adicionar
      </v-btn>
    </div>

    <v-text-field v-model="busca" :loading="loading" append-inner-icon="mdi-magnify" density="compact"
      label="Procure um Usuário" variant="underlined" hide-details single-line @click:append-inner="searchUser"
      @keyup.enter="searchUser" />

    <v-card v-for="user in usuarios" :key="user">
      <v-card-text>
        <v-row align="center">

          <v-col cols="3" sm="3">
            <v-avatar color="surface-variant" image="/src/assets/avatar.png" v-if="!user.foto">
            </v-avatar>
            <v-avatar color="surface-variant" :image="user.foto" v-if="user.foto">
            </v-avatar>
          </v-col>

          <v-col cols="9" sm="3">
            <div class="ma-1">
              <h3>{{ user.nome }}</h3>
              <p>{{ user.email }}</p>
            </div>
          </v-col>

          <v-col cols="4" sm="3" class="text-align text-uppercase">
            <v-chip size="small" :color="colorTipoUser(user.tipo_admin)">{{ user.tipo_admin }}</v-chip>
          </v-col>

          <v-col cols="8" sm="3" class="text-end">
            <EditarCadUsuarioAdmin v-if="usuario.dadosUser.tipo_admin === 'super'" :MostrarUsuarios="mostrarUsuarios"
              :User="user" />
            <v-btn variant="text" icon="mdi mdi-pencil" v-if="usuario.dadosUser.tipo_admin != 'super'"
              @click="showSnackbar = true">
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