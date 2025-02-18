<template>
  <div>
    <Navbar />
    <v-container class="d-flex flex-column ga-8 pa-6 mt-5">
      <div class="d-flex align-center ga-1">
        <h1 style="font-size: clamp(17px, 4vw, 25px);">
          Empresas do Sistema
        </h1>
        <v-spacer></v-spacer>
      </div>
      <v-data-iterator :items="empresas" :items-per-page="10" :search="busca">
        <template v-slot:header>
          <v-text-field v-model="busca" :loading="loading" append-inner-icon="mdi-magnify" density="compact"
            label="Procure uma Empresa" variant="underlined" hide-details single-line />
        </template>
        <template v-slot:default="{ items }">
          <v-card v-for="item in items" :key="item" class="my-8">
            <v-card-text>
              <v-row align="center">
                <v-col cols="12" sm="4" class="d-flex align-center ga-2">
                  <v-avatar color="surface-variant" image="/src/assets/avatar.png" v-if="!item.raw.foto">
                  </v-avatar>
                  <v-avatar color="surface-variant" :image="`${this.dominio}/uploads/perfil/${item.raw.foto}`"
                    v-if="item.raw.foto">
                  </v-avatar>
                  <div>
                    <h3>{{ item.raw.nome_fantasia }}</h3>
                    <p>{{ item.raw.email }}</p>
                  </div>
                </v-col>
                <v-col cols="12" sm="3" class="text-align">
                  <p>
                    <v-icon>mdi-cellphone</v-icon>
                    {{ this.formatarCelular(item.raw.celular) }}
                  </p>
                </v-col>
                <v-col cols="9" sm="4" class="text-align">
                  <v-chip size="small" :color="colorTipoUser(item.raw.verificado)">{{ item.raw.verificado === 1 ?
                    'Verificado' :
                    'Não verificado' }}</v-chip>
                </v-col>
                <v-col cols="3" sm="1" class="text-end">
                  <EditarCadEmpresaAdmin v-if="usuario.dadosUser.tipo_admin === 'super'"
                    :MostrarUsuarios="mostrarUsuarios" :User="item.raw" />
                  <v-btn variant="plain" icon="mdi mdi-pencil" v-else @click="showSnackbar = true">
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
        <template v-if="empresas.length > 0" v-slot:footer="{ page, pageCount, prevPage, nextPage }">
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
      <template v-if="!empresas.length">
        <v-empty-state icon="mdi-magnify" text="Atualize a página e tente novamente."
          title="Não há empresas cadastradas no momento."></v-empty-state>
      </template>
    </v-container>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useCandidatoStore } from "@/stores/candidato";
import axios from "axios";

export default {
  data: () => ({
    items: [{ text: "Offline", icon: "mdi-check-circle" }],
    empresas: "",
    showSnackbar: false,
    loading: false,
    dialog: false,
    busca: '',
    dominio: import.meta.env.VITE_BACKEND_URL
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
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/empresa/read/all`,
          {
            withCredentials: true,
          }
        );

        console.log("Array de empresas", response.data);
        this.empresas = response.data.usuarios;
      } catch (error) {
        console.error("Erro: ", error.response.data);
      }
    },
    async pesquisaEmpresa() {
      console.clear();
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/empresa/pesquisaEmpresa`,
          {
            params: {
              busca: this.busca,
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        this.empresas = response.data.result;
      } catch (error) {
        console.error("Erro na busca:", error.response.data);
        this.empresas = "";
      }
    },
    colorTipoUser(value) {
      if (value === 1)
        return 'success';

      return 'error';
    },
    formatarCelular(valorTelefone) {
      valorTelefone = valorTelefone.replace(/\D/g, "");
      valorTelefone = valorTelefone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      return valorTelefone;
    }
  },
};
</script>
<style lang="scss" scoped>
.main-container {
  background-color: #e1d6f6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.v-card-text {
  padding: 30px 40px 30px 20px !important;
  flex: 1 1 auto;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  opacity: var(--v-card-text-opacity, 1);
  text-transform: none;
}

.empresa-foto {
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
}

.list-empresa {
  width: 95%;
  padding: 10px 0;
}

.card-da-empresa {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
}

.busca {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
}

.empresa-nome {
  font-size: 16px;
  font-weight: 600;
}

.procurar-empresas {
  width: 450px;
}

.localizacao-empresa {
  text-align: center;
  font-size: 12px;
}

.locaCor {
  padding: 5px;
  margin: 15px;
  font-weight: 700;
}

.status {
  align-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #34c759; // cor verde
  margin: 0 100px;
}

.v-btn__content {
  font-size: 12px !important;
  font-weight: bold !important;
  color: black !important;
}

// Responsividade para telas menores
@media (max-width: 768px) {
  .main-container {
    padding: 10px;
  }

  .procurar-empresas {
    width: 100%;
    margin: 10px 0;
  }

  .list-empresa-row {
    margin-bottom: 10px;
  }

  .card-da-empresa {
    flex-direction: row;
    padding: 10px;
  }

  .localizacao-empresa {
    text-align: center;
    font-size: 10px;
  }

  .empresa-nome {
    font-size: 12px;
  }

  .locaCor {
    padding: 5px;
    margin: 15px;
  }

  .v-card-text {
    padding: 10px 15px 5px !important;
  }

  .busca {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15px;
  }

  .status {
    align-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #34c759; // cor verde
    margin: 0 30px;
  }
}
</style>