<template>
  <div style="height: 100%">
    <Navbar />
    <v-container fluid class="fill-height main-container">
      <div class="text-center mt-4">
        <h1>Lista de Usuarios</h1>
      </div>

      <div class="procurar-Usuarios">
        <v-card-text>
          <v-text-field
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Procure um Usúario."
            variant="solo"
            hide-details
            single-line
            @click:append-inner="onClick"
          >
          </v-text-field>
        </v-card-text>
      </div>

      <div class="list-usuario">
        <v-row v-for="n in 6" :key="n" class="list-usuario-row">
          <v-col cols="12">
            <v-card class="card-do-usuario">
              <v-row align="center" no-gutters>
                <v-col cols="3" class="text-center">
                  <v-avatar color="surface-variant" size="60">
                    <v-icon >mdi-account-circle</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="3">
                  <h3 class="usuario-nome">Robsoh Hush</h3>
                  <p class="usuario-email">robsoh56@gmail.com</p>
                </v-col>
                <v-col cols="3">
                  <p class="tipodeUsuario">Administrador</p>
                </v-col>
                <v-col cols="2" class="text-right">
                  <div class="locaCor"><MenuAdminUsuario /></div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import MenuAdminUsuario from "./MenuAdminUsuario.vue";
export default {
  components: { MenuAdminUsuario },
  data: () => ({
    loading: false,
  }),
  methods: {
    onClick() {
      // Função de exemplo para o clique no ícone de busca
    },
  },
};
</script>

<style lang="scss" scoped>
// Estilos gerais
.main-container {
  background-color: #e1d6f6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.list-usuario {
  width: 95%;
  padding: 10px 0;
}

.card-do-usuario {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
}

.usuario-nome {
  font-size: 16px;
  font-weight: 600;
}

.tipodeUsuario {
  font-size: 14px;
  color: #666;
}
.usuario-email {
  font-size: 14px;
  color: #666;
}

.procurar-Usuarios {
  width: 80%;
}

.locaCor {
  padding: 5px;
  margin: 15px;
}
// Responsividade para telas menores
@media (max-width: 768px) {
  .main-container {
    padding: 10px;
  }

  .procurar-Usuarios {
    width: 100%;
    margin: 10px 0;
  }

  .list-usuario-row {
    margin-bottom: 10px;
  }

  .card-do-usuario {
    flex-direction: row;
    padding: 10px;
  }

  .usuario-nome {
    font-size: 14px;
  }

  .usuario-email {
    font-size: 12px;
  }
  .locaCor {
    padding: 5px;
    margin: 15px;
  }
}
</style>