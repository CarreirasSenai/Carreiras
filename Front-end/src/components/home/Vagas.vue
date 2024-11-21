<template>
  <div style="height: 70vh; margin-bottom: 100px;">
    <v-data-iterator :items="vagas" :items-per-page="12" :search="search" v-if="vagas.length">
      <!-- <template v-slot:header>
              <v-toolbar>
                  <v-text-field v-model="search" class="mt-2 mx-4" density="comfortable" placeholder="Pesquise uma vaga"
                      prepend-inner-icon="mdi-magnify" variant="plain">
                  </v-text-field>
              </v-toolbar>
          </template> -->
      <template v-slot:default="{ items }">
        <v-row>
          <v-col cols="12" lg="4" md="6" sm="6" v-for="item in items" :key="item.id">
            <v-card class="elevation-2 rounded-lg observavel" style="border-color: #6200EA !important;" :ref="item.id">
              <v-card-title class="opacity-100 bg-deep-purple-accent-4 rounded-lg observavel">
                {{ item.raw.titulo }}
              </v-card-title>
              <v-card-text class="pa-4" style="min-height: 120px;">
                <v-row dense>
                  <v-col cols="6">
                    <p class="observavel">
                      <span class="mdi mdi-map-marker text-h6 text-grey-darken-1"></span>
                      &nbsp;{{ item.raw.cidade }}, {{ item.raw.estado }}
                    </p>
                  </v-col>
                  <v-col cols="6">
                    <p class="observavel">
                      <span class="mdi mdi-laptop text-h6 text-grey-darken-1"></span>
                      &nbsp;{{ item.raw.modalidade }}
                    </p>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="6">
                    <p class="observavel">
                      <span class="mdi mdi-clipboard-text text-h6 text-grey-darken-1"></span>
                      &nbsp;{{ item.raw.contrato }}
                    </p>
                  </v-col>
                  <v-col cols="6">
                    <p class="observavel">
                      <span class="mdi mdi-medal text-h6 text-grey-darken-1"></span>
                      &nbsp;{{ item.raw.nivel }}
                    </p>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12">
                    <p class="observavel overflow-hidden" style="white-space: nowrap;">
                      <v-chip v-for="(habilidade, index) in JSON.parse(item.raw.habilidades_exigidas).slice(0, 3)"
                        :key="index" size="small" variant="outlined" color="deep-purple-accent-4" class="mr-2">
                        {{ habilidade }}
                      </v-chip>

                      <!-- Caso não existam habilidades -->
                      <v-chip v-if="JSON.parse(item.raw.habilidades_exigidas).length === 0" size="small" class="mr-2"
                        color="white">
                      </v-chip>
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
              <small
                class="position-absolute top-0 right-0 ma-2 text-white observavel bg-deep-purple-accent-3 pa-1 rounded-lg elevation-2 data-vaga">
                {{ formatarDataRelativa(item.raw.data_atu) }}
              </small>
              <v-card-actions class="d-flex justify-space-between">
                <ModalDetalhesVaga :Vagas="item" :MostrarVagas="mostrarVagas" />
                <router-link :to="`/perfil-empresa?requisicao=empresa&id=${item.raw.id_empresa}`"
                  class="text-black text-decoration-none">
                  <div v-for="empresa in ListaEmpresas" :key="empresa.id">
                    <span v-if="empresa.id === item.raw.id_empresa" class="d-flex align-center justify-center ga-2">
                      {{ empresa.nome_fantasia }}
                      <img :src="empresa.foto" width="50px" class="rounded-circle" to="/perfil-empresa">
                    </span>
                  </div>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }" v-if="vagas.length > 12">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
            @click="prevPage"></v-btn>
          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>
          <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal" rounded
            @click="nextPage"></v-btn>
        </div>
      </template>
    </v-data-iterator>
    <template v-if="!vagas.length && dadosCarregados === true">
      <v-empty-state icon="mdi-magnify"
        text="Tente ajustar seus termos ou filtros de pesquisa. Às vezes, termos menos específicos ou consultas mais amplas podem ajudá-lo a encontrar o que procura."
        title="Não encontramos uma correspondência."></v-empty-state>
    </template>
    <div v-if="dadosCarregados === false" class="text-center pt-9 d-flex align-center justify-center"
      style="height: 45vh;">
      <v-progress-circular color="deep-purple-accent-4" indeterminate :size="50"></v-progress-circular>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import { useCandidatoStore } from '@/stores/candidato';
import { usePesquisaVaga } from '@/stores/pesquisaVaga';
import { watch } from 'vue';

export default {
  data() {
    return {
      vagas: [],
      search: '',
      dadosCarregados: false,
      ListaEmpresas: []
    }
  },

  mounted() {
    this.mostrarVagas();

    const pesquisaStore = usePesquisaVaga();
    watch(
      () => pesquisaStore.pesquisa,
      (newValue) => {
        this.vagas = newValue;
      },
      { immediate: true } // Executa a função de callback imediatamente, com o valor atual da store
    );

    this.getAllEmpresas();
  },

  computed: {
    user() { return useCandidatoStore(); },
    pesquisa() { return usePesquisaVaga(); },
  },

  methods: {
    async mostrarVagas() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/read/all`, {
          withCredentials: true
        });

        setTimeout(() => {
          this.vagas = response.data.result.filter(vaga => vaga.status === 1);
          this.dadosCarregados = true;
        }, 2000);

      } catch (error) {
        console.error('Erro', error.response.data);
      }
    },

    formatarDataRelativa(data) {
      const agora = new Date();
      const dataPassada = new Date(data);

      const diferencaTempo = agora - dataPassada;
      const segundos = Math.floor(diferencaTempo / 1000);
      const minutos = Math.floor(segundos / 60);
      const horas = Math.floor(minutos / 60);
      const dias = Math.floor(horas / 24);
      const semanas = Math.floor(dias / 7);
      const meses = Math.floor(dias / 30);
      const anos = Math.floor(meses / 12);

      if (dias === 0) {
        return 'Hoje';
      } else if (dias === 1) {
        return 'Há 1 dia';
      } else if (dias < 7) {
        return `Há ${dias} dias`;
      } else if (semanas === 1) {
        return 'Há 1 semana';
      } else if (semanas < 5) {
        return `Há ${semanas} semanas`;
      } else if (meses === 1) {
        return 'Há 1 mês';
      } else if (meses < 12) {
        return `Há ${meses} meses`;
      } else if (anos === 1) {
        return 'Há 1 ano';
      } else {
        return `Há ${anos} anos`;
      }
    },

    async getAllEmpresas() {
      console.clear()
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/empresa/read/all`, {
          withCredentials: true
        });

        console.log("Lista de empresas:", response.data.usuarios);

        this.ListaEmpresas = response.data.usuarios;

        for (const key in this.ListaEmpresas) {
          const path = `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/`;
          const avatarPadrao = '/src/assets/avatar.png';
          const capaPadrao = '/src/assets/capa (1).png';

          const foto = this.ListaEmpresas[key].foto;
          const capa = this.ListaEmpresas[key].capa;

          this.ListaEmpresas[key].foto = foto ? path + foto : avatarPadrao;
          this.ListaEmpresas[key].capa = capa ? path + capa : capaPadrao;
        }

      } catch (error) {
        console.error('Erro ao obter lista de empresas', error.response.data);
      }
    },
  }
};
</script>

<style scoped>
@media (max-width: 600px) {
  .row-rev div:nth-child(2) {
    display: flex;
    justify-content: start;
  }
}

.v-card {
  transition: transform 0.3s;
}

.v-card:hover {
  transform: scale(1.01);
}

.v-card.visivel {
  animation: fadeInLeft 1s normal;
}

.v-card-title.visivel {
  animation: fadeInLeft 2s normal;
}

.data-vaga.visivel {
  animation: fadeInLeft 2s normal;
}

.cards-container {
  margin-bottom: 40px;
}
</style>
