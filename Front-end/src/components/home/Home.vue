<template>
  <!-- <Navbar/> -->
  <div class="search-container">
    <h1>Encontre uma carreira para você!</h1>
    <div class="search-field">
      <v-card-text>
        <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
          label="Digite um cargo, cidade, estado." variant="solo" hide-details single-line
          @click:append-inner="onClick">
        </v-text-field>
      </v-card-text>
    </div>
  </div>
  <div class="mx-4">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" sm="6" lg="3">
        <v-card color="#3A1C76" variant="outlined" class="mx-auto">
          <v-card-item class="card-vaga">
            <div>
              <div class="mb-1 nome-vaga">
                Analista de Suporte ao Usuário Júnior
              </div>
              <div class="corpo-card-vaga">
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
            <span>Freeline Informática</span>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="6" lg="3">
        <v-card color="#3A1C76" variant="outlined" class="mx-auto">
          <v-card-item class="card-vaga">
            <div>
              <div class="mb-1 nome-vaga">
                Analista de Suporte ao Usuário Júnior
              </div>
              <div class="corpo-card-vaga">
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
            <span>Freeline Informática</span>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="6" lg="3">
        <v-card color="#3A1C76" variant="outlined" class="mx-auto">
          <v-card-item class="card-vaga">
            <div>
              <div class="mb-1 nome-vaga">
                Analista de Suporte ao Usuário Júnior
              </div>
              <div class="corpo-card-vaga">
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
            <span>Freeline Informática</span>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="6" lg="3">
        <v-card color="#3A1C76" variant="outlined" class="mx-auto">
          <v-card-item class="card-vaga">
            <div>
              <div class="mb-1 nome-vaga">
                Analista de Suporte ao Usuário Júnior
              </div>
              <div class="corpo-card-vaga">
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
            <span>Freeline Informática</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
  }),

  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1em 1em;
  text-align: center;
  background-color: #6832D2;
  border: thin solid #5300DB;
  border-radius: 10px;
  min-height: 35%;
  gap: 2.5em;
  padding: 2em 5px;

  .search-field {
    max-width: 800px !important;
    width: 100% !important;
  }

  h1 {
    color: #fff;
  }
}

.card-vaga {
  padding: 0;
}

.nome-vaga {
  background-color: #3A1C76;
  color: white;
  width: 100%;
  text-align: center;
  padding: 10px 5px;
}

.corpo-card-vaga {
  padding: 10px 16px;
  color: #333;
}

.requisitos-vaga {
  list-style: none;
  font-size: 15px;
}

.container-empresa {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  margin: 0 10px;
}

.logo-vaga {
  border: 2px solid #3A1C76;
  border-radius: 50%;
  height: 60px;
  width: 60px;
}
</style>
