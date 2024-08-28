<template>
  <div style="height: 100%">
    <Navbar />
    <v-container fluid class="fill-height main-container">
      <div class="text-center mt-4">
        <h1>Lista de candidatos</h1>
      </div>

      <div class="busca">
        <div class="procurar-candidatos">
          <v-card-text>
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Procure um Candidatos."
              variant="solo"
              hide-details
              single-line
              @click:append-inner="onClick"
            />
          </v-card-text>
        </div>
      </div>

      <div class="list-candidato">
        <v-row v-for="n in 6" :key="n" class="list-candidato-row">
          <v-col cols="12">
            <v-card class="card-do-candidato rounded">
              <v-row align="center" no-gutters>
                <v-col cols="3" class="text-center">
                  <v-avatar color="surface-variant" size="60">
                    <v-icon class="empresa-foto">mdi-account-circle</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cons="3">
                  <h3>Fulano da Silva dos Santos</h3>
                  <span>Analista de testes</span>
                </v-col>
                <v-col cons="3">
                  <div>
                    <ul class="habilidades-candidato">
                      <li>HTML</li>
                      <li>CSS</li>
                      <li>JavaScript</li>
                      <li>Java</li>
                      <li>MySQL</li>
                    </ul>
                  </div>
                </v-col>
                <v-col cols="2">
                  <a href="/perfil-candidato">
                    <v-icon
                      class="perfil-candidato-link"
                      icon="mdi-arrow-top-right"
                      color="black"
                    />
                  </a>
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
export default {
  data() {},
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

.candidato-foto {
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
}

.list-candidato {
  width: 95%;
  padding: 10px 0;
}

.card-do-candidato {
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

.candidato-nome {
  font-size: 16px;
  font-weight: 600;
}

.procurar-candidatos {
  width: 450px;
}

.corpo-card-candidato {
  display: inherit;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.locaCor {
  padding: 5px;
  margin: 15px;
  font-weight: 700;
}

.habilidades-candidato {
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px auto;

  li {
    background-color: #adadad;
    padding: 5px 25px;
    border-radius: 10px;
    user-select: none;
  }
}

.card-candidato {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 90%;
}

.perfil-candidato-link {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

.skills {
  width: 100%;
  display: flex;
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

  .procurar-candidatos {
    width: 100%;
    margin: 10px 0;
  }

  .list-candidato-row {
    margin-bottom: 10px;
  }

  .card-do-candidato {
    flex-direction: row;
    padding: 10px;
  }

  .candidato-nome {
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
}
</style>