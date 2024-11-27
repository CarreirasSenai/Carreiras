<template>
  <Navbar />
  <v-container class="d-flex flex-column ga-8 pa-6 mt-5">
    <div class="d-flex align-center ga-1">
      <h1 style="font-size: clamp(17px, 4vw, 25px)">
        Lista de Candidatos
      </h1>
    </div>

    <v-data-iterator :items="usuarios" :items-per-page="10" :search="busca">
      <template v-slot:header>
        <v-text-field v-model="busca" :loading="loading" append-inner-icon="mdi-magnify" density="compact"
          label="Procure um Usuário" variant="underlined" hide-details single-line />
      </template>
      <template v-slot:default="{ items }">
        <v-card v-for="user in items" :key="user" class="my-8">
          <v-card-text>
            <v-row align="center">
              <v-col cols="3" sm="2">
                <v-avatar color="surface-variant" image="/src/assets/avatar.png" v-if="!user.raw.foto">
                </v-avatar>
                <v-avatar color="surface-variant" :image="`${this.dominio}/uploads/perfil/${user.raw.foto}`"
                  v-if="user.raw.foto">
                </v-avatar>
              </v-col>
              <v-col cols="9" sm="3">
                <div class="ma-1">
                  <h3>{{ user.raw.nome_completo }}</h3>
                  <p>{{ user.raw.email }}</p>
                </div>
              </v-col>
              <v-col cols="12" sm="3" class="text-align">
                <p>
                  <v-icon>mdi-card-account-details-outline </v-icon>
                  {{ formattedCpf(user.raw.cpf) }}
                </p>
              </v-col>
              <v-col cols="4" sm="3" class="text-align text-uppercase">
              </v-col>
              <v-col cols="8" sm="1" class="text-end">
                <EditarCadCandidatoAdmin v-if="
                  usuario.dadosUser.tipo_admin === 'super' ||
                  usuario.dadosUser.id === user.raw.id
                " :MostrarUsuarios="mostrarUsuarios" :User="user.raw" />
                <v-btn variant="text" icon="mdi mdi-pencil" v-else @click="showSnackbar = true">
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
      <template v-if="usuarios.length > 0" v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
            @click="prevPage"></v-btn>
          <div class="mx-2 text-caption">
            Página {{ page }} de {{ pageCount }}
          </div>
          <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal" rounded
            @click="nextPage"></v-btn>
        </div>
      </template>
    </v-data-iterator>
    <template v-if="!usuarios.length">
      <v-empty-state icon="mdi-magnify" text="Atualize a página e tente novamente."
        title="Não há candidatos cadastrados no momento."></v-empty-state>
    </template>
  </v-container>

  <v-snackbar location="top right" v-model="showSnackbar" :timeout="4000" color="red" elevation="24">
    <div class="text-center">
      Você é
      <span class="text-uppercase rounded-xl pa-1 ma-1" :class="'bg-' + colorTipoUser(usuario.dadosUser.tipo_admin)">{{
        usuario.dadosUser.tipo_admin }}</span>
      não tem acesso! 👎😂
    </div>
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
    usuarios: "",
    busca: "",
    dominio: import.meta.env.VITE_BACKEND_URL
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
    },
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
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/candidato/read/all`,
          {
            withCredentials: true,
          }
        );

        console.log("candidatos: ", response.data);
        this.usuarios = response.data.usuarios;
      } catch (error) {
        console.log(error.data);
      }
    },

    async pesquisaCandidato() {
      console.clear();
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/candidato/pesquisaCandidato`,
          {
            params: {
              busca: this.busca,
            },
            withCredentials: true,
          }
        );

        console.log(response.data);
        this.usuarios = response.data.result;
      } catch (error) {
        console.error("Erro na busca:", error.response.data);
        this.usuarios = "";
      }
    },

    colorTipoUser(value) {
      if (value === "adm") {
        return "success";
      } else if (value === "user") {
        return "primary";
      } else if (value === "super") {
        return "error";
      }
    },

    formattedCpf(cpf) {
      if (cpf === null || cpf === undefined) {
        return "";
      }
      if (typeof cpf === "string" && cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }
      return cpf;
    },
  },
};
</script>

<style>
.main-container {
  background-color: #e1d6f6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.text-align {
  text-align: center;
}

@media (max-width: 600px) {
  .text-align {
    text-align: left;
  }
}
</style>