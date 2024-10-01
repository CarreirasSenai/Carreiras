<template>
  <Navbar />
  <v-container class="d-flex flex-column ga-8 pa-6 mt-5">

    <div class="d-flex align-center ga-1">
      <h1 style="font-size: 3vh;">Usuários do Sistema</h1>
      <v-spacer></v-spacer>
      <CadUsuarioAdmin :MostrarUsuarios="mostrarUsuarios" />
    </div>

    <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact" label="Procure um Usuário"
      variant="underlined" hide-details single-line @click:append-inner="onClick" />

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

          <v-col cols="4" sm="3" class="text-align">
            <v-chip size="small" :color="colorTipoUser(user.tipo_admin)">{{ user.tipo_admin }}</v-chip>
          </v-col>

          <v-col cols="8" sm="3" class="text-end">
            <EditarCadUsuarioAdmin v-if="usuario.dadosUser.tipo_admin === 'super'" :MostrarUsuarios="mostrarUsuarios"
              :User="user" />
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useCandidatoStore } from "@/stores/candidato";

import axios from "axios";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    usuarios: ''
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

    onClick() {
      console.log("Ícone de busca clicado");
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
  .text-align{
    text-align: left;
  }
}
</style>