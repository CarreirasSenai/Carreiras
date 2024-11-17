<template>
  <div style="height: 100%">
    <Navbar />

    <v-container class="d-flex flex-column ga-8 pa-6 mt-5">
      <div class="d-flex align-center ga-1">
        <h1 style="font-size: clamp(17px, 4vw, 25px);">
          Vagas em Aprovação
        </h1>
        <v-spacer></v-spacer>
      </div>

      <v-data-iterator :items="vagas" :items-per-page="10" :search="search">
        <template v-slot:header>
          <v-text-field v-model="search" append-inner-icon="mdi-magnify" density="compact" label="Procure uma Vaga"
            variant="underlined" hide-details single-line />
        </template>

        <template v-slot:default="{ items }">
          <v-card v-for="item in items" :key="item" class="my-8">
            <v-card-text>
              <v-row align="center">
                <v-col cols="6" sm="4" class="d-flex align-center ga-2">
                  <v-avatar color="surface-variant" image="/src/assets/avatar.png">
                  </v-avatar>
                  <v-avatar color="surface-variant" :image="`${this.dominio}/uploads/perfil/${item.raw.foto}`"
                    v-if="item.raw.foto">
                  </v-avatar>
                  <div>
                    <h3>{{ item.raw.titulo }}</h3>
                    <p>{{ item.raw.cep }} - {{ item.raw.cidade }} - {{ item.raw.estado }}</p>
                  </div>
                </v-col>
                <v-col cols="3" sm="4" class="text-align">
                  <v-chip size="small" :color="colorTipoVaga(item.raw.status)">{{ item.raw.status === 1 ? 'Verificada' :
                    'Não verificada' }}</v-chip>
                </v-col>
                <v-col cols="3" sm="4" class="text-end">
                  <ModalDetalhesVaga :Vagas="item" :MostrarVagas="mostrarVagas"></ModalDetalhesVaga>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
        <template v-if="vagas.length > 0" v-slot:footer="{ page, pageCount, prevPage, nextPage }">
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
      <template v-if="!vagas.length">
        <v-empty-state icon="mdi-magnify"
          text="Atualize a página ou espere que uma vaga seja cadastrada e tente novamente."
          title="Não há vagas para aprovar."></v-empty-state>
      </template>
      <div v-if="dadosCarregados === false" class="text-center pt-9 d-flex align-center justify-center"
        style="height: 45vh;">
        <v-progress-circular color="deep-purple-accent-4" indeterminate :size="50"></v-progress-circular>
      </div>
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
      vagas: "",
      showSnackbar: false,
      search: '',
      dominio: import.meta.env.VITE_BACKEND_URL
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
    this.mostrarVagas();
  },
  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    async mostrarVagas() {
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
    },
    colorTipoVaga(value) {
      if (value === 1)
        return 'success';

      return 'error';
    }
  }
}
</script>

<style scoped lang="scss">
.vacancy-list-container {
  background-color: #e1d6f6;
  ;
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