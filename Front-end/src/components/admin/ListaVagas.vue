<template>
  <div style="height: 100%">
    <Navbar />
    <v-container class="d-flex flex-column ga-8 pa-6 mt-5">
      <div class="d-flex align-center ga-1">
        <h1 style="font-size: clamp(17px, 4vw, 25px);">
          Vagas
        </h1>
        <v-spacer></v-spacer>
      </div>
      <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact" label="Procure uma Vaga"
        variant="underlined" hide-details single-line/>
      <v-card v-for="user in vagas" :key="user">
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" sm="4" class="d-flex align-center ga-2">
              <v-avatar color="surface-variant" image="/src/assets/avatar.png">
              </v-avatar>
              <!-- <v-avatar color="surface-variant" :image="user.foto" v-if="user.foto">
              </v-avatar> -->
              <div>
                <h3>{{user.titulo}}</h3>
                <p>{{user.cidade}} - {{user.estado}}</p>
              </div>
            </v-col>
            <v-col cols="12" sm="3" class="text-align">
              <p>
                <v-icon>mdi-cellphone</v-icon>
                {{user.cep}}
              </p>
            </v-col>
            <v-col cols="9" sm="4" class="text-align">
              <!-- <v-chip size="small" :color="colorTipoUser(user.verificado)">{{ user.verificado === 1 ? 'Verificado' :
                'Não verificado' }}</v-chip> -->
            </v-col>
            <v-col cols="3" sm="1" class="text-end">
              <!-- <EditarCadEmpresaAdmin v-if="usuario.dadosUser.tipo_admin === 'super'" :MostrarUsuarios="mostrarUsuarios"
                :User="user" /> -->
              <v-btn variant="plain" icon="mdi mdi-pencil">
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useCandidatoStore } from '@/stores/candidato';
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      vagas: ""
    }
  },
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
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    async mostrarUsuarios() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/vaga/read/all`, {
            withCredentials: true
          }
        );
        this.vagas = response.data.result;
      } catch (error) {
        console.error("Erro: ", error.response.data);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.vacancy-list-container {
  background-color: #e1d6f6;;
  display: flex;
  height: 100%;
  flex-direction: column;

  h1 {
    margin: 20px auto;
    color: #3A1C76;
  }
}

.busca {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
}

.status {
  align-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #DB0000;
}

.procurar-Usuarios {
  width: 400px;
}
</style>