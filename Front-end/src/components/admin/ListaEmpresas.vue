<template>
  <div>
    <Navbar />
    <v-container class="d-flex flex-column ga-8 pa-6 mt-5">
      <div class="d-flex align-center ga-1">
        <h1 style="font-size: 3vh;">Empresas do Sistema</h1>
        <v-spacer></v-spacer>
      </div>
      <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact" label="Procure uma Empresa"
        variant="underlined" hide-details single-line @click:append-inner="onClick" />
      <v-card v-for="user in empresas" :key="user">
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
                <h3>{{ user.nome_fantasia }}</h3>
                <p>{{ user.email }}</p>
              </div>
            </v-col>
            <v-col cols="4" sm="3" class="text-align">
              <v-chip size="small" :color="colorTipoUser(user.verificado)">{{ user.verificado === 1 ? 'Verificado' : 'Não verificado'}}</v-chip>
            </v-col>
            <v-col cols="8" sm="3" class="text-end">
              <MenuAdminEmpresa v-if="usuario.dadosUser.tipo_admin === 'super'" :MostrarUsuarios="mostrarUsuarios"
                :User="user" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useCandidatoStore } from "@/stores/candidato";

import axios from "axios";
import MenuAdminEmpresa from "./MenuAdminEmpresa.vue";
export default {
  components: { MenuAdminEmpresa },
  data: () => ({
    items: [{ text: "Offline", icon: "mdi-check-circle" }],
    empresas: "",
  }),
  computed: {
    auth() {
      return useAuthStore();
    },
    usuario() {
      return useCandidatoStore();
    }
  },
  mounted() {
    this.recuperaEmpresas();
  },
  methods: {
    async recuperaEmpresas() {
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
    colorTipoUser(value) {
      if (value === 1) 
        return 'success';
      
      return 'error';
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