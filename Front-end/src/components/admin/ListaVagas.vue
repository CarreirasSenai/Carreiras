<template>
  <div class="vacancy-list-container" style="height: 100%">
    <Navbar />
    <h1>Lista de vagas</h1>
      <div class="busca">
        <div class="procurar-Usuarios">
          <v-card-text>
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Pesquisar"
              variant="solo"
              hide-details
              single-line
              @click:append-inner="onClick"
            />
          </v-card-text>
        </div>
      </div>
      <div class="empresa-info rounded my-2">
        <div>
          <v-avatar color="surface-variant" size="60">
              <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          <p>TOTVS - EMPRESAS INTELIGENTES</p>
        </div>
        <p><strong>Localização:</strong> Joinville, SC</p>
        <p class="status"></p>
      </div>
      <div class="vagas-container rounded">
        <div class="vagas-cadastradas-container rounded">
          <div class="vagas-cadastradas rounded">
            <p>Vagas Cadastradas</p>
            <p>Data de postagem</p>
            <span style="color: #DB0000;">1 Strike</span>
          </div>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="i in 3"
                :key="i"
                text="Lorem ipsum dolor sit amet"
                title="Item"
              ></v-expansion-panel>
            </v-expansion-panels>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="scss">
.vacancy-list-container {
    background-color: #E1D6F6;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;

    h1 {
      margin: 20px auto;
      color: #3A1C76;
    }
}

.busca {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
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

.empresa-info {
  background-color: #FAFAFA;
  width: 95%;
  padding: 10px 30px;
  border: .5px solid #3A1C76;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: inherit;
    align-items: inherit;
    gap: 20px;
  }
}

.vagas-container {
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  width: 95%;
  padding: 35px 20px;
  margin: 15px auto;
  border: .5px solid #3A1C76;
}

.vagas-cadastradas-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 30px 40px;
  background-color: #fafafa;
}

.vagas-cadastradas {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #3A1C76;
  color: #ffffff;
  padding: 15px 10px;
}

@media (max-width: 768px) {
  .busca {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15px;
  }

.procurar-Usuarios {
    width: 100%;
    margin: 10px 0;
  }

  .empresa-info {
    padding: 10px 15px;

    div{
      p{
        font-size: 14px;
      }
    }
  }

  .status {
    height: 25px;
    width: 35px;
  }
}
</style>