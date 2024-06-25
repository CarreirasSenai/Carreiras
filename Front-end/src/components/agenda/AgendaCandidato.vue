<template>
  <v-container fluid class="bg-deep-purple-lighten-4" style="width: 100%;">
    <v-row style="justify-content: space-between; margin: 0px !important; padding:0px !important;">

      <v-col style="display:flex; flex-direction: column; align-items: center; width:100%;" cols="12" md="6">
        <h1 style="margin: 20px;  font-size: 1.6em;">VAGAS CANDATADAS</h1>
        <div style="width: 96%; margin-top: 30px;">
          <!-- AQUI TEM OS CARDS-->
          <v-col>
            <v-card color="#3A1C76" variant="outlined" class="bg-white">
              <v-card-item>
                <div>
                  <div class="corpo-card-vaga">
                    <div class="mb-2" style="display: flex; align-items: center;justify-content: space-between;">
                      <h2>Analista de Suporte ao Usuário Júnior</h2>
                      <a class="action-label icon" @click="toggleIcon">
                        <i :class="iconClass"></i>
                      </a>
                    </div>
                    <div class="text-caption">
                      <ul class="requisitos-vaga">
                        <li><strong>Localização:</strong> Freeline Informática - Joinville, SC</li>
                        <li><strong>Tipo de Contrato:</strong> CLT</li>
                        <li><strong>Modalidade de Trabalho:</strong> Presencial</li>
                        <li><strong>Remuneração: </strong> Salário compatível com a função + Benefícios</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </v-card-item>
              <div class="my-2 container-empresa">
                <img class="logo-vaga" src="https://picsum.photos/seed/picsum/150/150" alt="logo">
                <span style="font-size: 20px;">Freeline Informática</span>
              </div>
            </v-card>
          </v-col>

          <v-col>
            <v-card color="#3A1C76" variant="outlined" class="bg-white">
              <v-card-item>
                <div>
                  <div class="corpo-card-vaga">
                    <div class="mb-2" style="display: flex; align-items: center;justify-content: space-between;">
                      <h2>Analista de Suporte ao Usuário Júnior</h2>
                      <a class="action-label icon" @click="toggleIcon">
                        <i :class="iconClass"></i>
                      </a>
                    </div>
                    <div class="text-caption">
                      <ul class="requisitos-vaga">
                        <li><strong>Localização:</strong> Freeline Informática - Joinville, SC</li>
                        <li><strong>Tipo de Contrato:</strong> CLT</li>
                        <li><strong>Modalidade de Trabalho:</strong> Presencial</li>
                        <li><strong>Remuneração: </strong> Salário compatível com a função + Benefícios</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </v-card-item>
              <div class="my-2 container-empresa">
                <img class="logo-vaga" src="https://picsum.photos/seed/picsum/150/150" alt="logo">
                <span style="font-size: 20px;">Freeline Informática</span>
              </div>
            </v-card>
          </v-col>

          <v-col>
            <v-card color="#3A1C76" variant="outlined" class="bg-white">
              <v-card-item>
                <div>
                  <div class="corpo-card-vaga">
                    <div class="mb-2" style="display: flex; align-items: center;justify-content: space-between;">
                      <h2>Analista de Suporte ao Usuário Júnior</h2>
                      <a class="action-label icon" @click="toggleIcon">
                        <i :class="iconClass"></i>
                      </a>
                    </div>
                    <div class="text-caption">
                      <ul class="requisitos-vaga">
                        <li><strong>Localização:</strong> Freeline Informática - Joinville, SC</li>
                        <li><strong>Tipo de Contrato:</strong> CLT</li>
                        <li><strong>Modalidade de Trabalho:</strong> Presencial</li>
                        <li><strong>Remuneração: </strong> Salário compatível com a função + Benefícios</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </v-card-item>
              <div class="my-2 container-empresa">
                <img class="logo-vaga" src="https://picsum.photos/seed/picsum/150/150" alt="logo">
                <span style="font-size: 20px;">Freeline Informática</span>
              </div>
            </v-card>
          </v-col>
          <!-- FIM CARD-->
        </div>
      </v-col>

      <!-- Calendar Section -->
      <v-col style="width:100%; height: auto;" cols="12" md="6">
        <CalendarComponent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CalendarComponent from './CalendarComponent.vue';

export default {
  components: {
    CalendarComponent
  },
  data() {
    return {
      iconVisible: false
    };
  },
  computed: {
    iconClass() {
      return this.iconVisible ? 'mdi mdi-eye' : 'mdi mdi-eye-off';
    },
  },
  methods: {
    toggleIcon() {
      this.iconVisible = !this.iconVisible;
    },
  }
};
</script>

<style scoped>
.full-width {
  width: 100%;
}

.margin-20 {
  margin: 20px;
}

.text-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  width: 96%;
  margin-top: 30px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.empresa-name {
  font-size: 20px;
}
.nome-vaga {
  background-color: #3A1C76;
  color: white;
  width: 100%;
  text-align: center;
  padding: 10px 5px;
}

.corpo-card-vaga {
  padding: 10px 0px;
  color: #333;
}

.requisitos-vaga {
  list-style: none;
  font-size: 20px;
  margin-left: 15px;
}

.container-empresa {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 15px;
  flex-direction: row-reverse;
}

.logo-vaga {
  border: 2px solid #3A1C76;
  border-radius: 50%;
  height: 60px;
  width: 60px;
}
</style>