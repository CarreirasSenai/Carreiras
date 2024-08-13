<template>
  <div style="height: 100%">
    <Navbar />
    <v-container fluid class="fill-height main-container">
      <div class="mt-4">
        <h1>Lista de Empresas</h1>
      </div>

      <div class="procurar-empresas">
        <v-card-text>
          <v-text-field
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Procure aqui uma Empresa."
            variant="solo"
            hide-details
            single-line
            @click:append-inner="onClick"
          >
          </v-text-field>
        </v-card-text>
      </div>

      <div class="list-empresa">
        <div class="card-do-empresa rounded" v-for="n in 6" :key="n">
          <div class="corpo-card-empresa">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>TOTVS - Sistemas Inteligentes</h3>
            </div>
          </div>
          <div class="localizacao-empresa"><span class="locaCor">Localização:</span> Joinville</div>
          <div class="status" />
          <div class="dotsNav"><MenuAdminEmpresa /></div>
        </div>
        <!-- <div class="card-do-empresa rounded">
          <div class="corpo-card-empresa">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>Whirlpool Corporation</h3>
            </div>
          </div>
          <div class="localizacao-empresa">Localização: Joinville</div>
          <img class="status" src="/src/assets/statusONteste.png" alt="" />
          <MenuAdminEmpresa />
        </div>
        <div class="card-do-empresa rounded">
          <div class="corpo-card-empresa">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>Dohler S.A</h3>
            </div>
          </div>
          <div class="localizacao-empresa">Localização: Joinville</div>
          <img class="status" src="/src/assets/statusONteste.png" alt="" />
          <MenuAdminEmpresa />
        </div>
        <div class="card-do-empresa rounded">
          <div class="corpo-card-empresa">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>NIDEC GLOBAL APPLIANCE BRASIL LTDA</h3>
            </div>
          </div>
          <div class="localizacao-empresa">Localização: Joinville</div>
          <img class="status" src="/src/assets/statusONteste.png" alt="" />
          <MenuAdminEmpresa />
        </div> -->
      </div>
    </v-container>
  </div>
</template>
<script>
import MenuAdminEmpresa from "./MenuAdminEmpresa.vue";
export default {
  components: { MenuAdminEmpresa },
  data: () => ({
    items: [{ text: "Offline", icon: "mdi-check-circle" }],
  }),
};
</script>
<style lang="scss" scoped>
// *{
//     border: 1px solid red;
// }
.main-container {
  background-color: #e1d6f6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.list-empresa {
  display: inherit;
  flex-direction: inherit;
  gap: 15px;
  width: 100%;
  padding: 30px 50px;
}

.card-do-empresa {
  background-color: white;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100rem;
  flex-wrap: wrap;
  max-width: 100%;
  position: relative;
}

.corpo-card-empresa {
  display: flex;
  align-items: center;
  flex: 1;
}

.localizacao-empresa {
  margin-left: auto;
   margin: 0 200px;
  text-align: center;
}
.locaCor{
font-weight: 600;
}

.status {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #34C759; // cor verde
  margin: 0 100px;
}
.dotsNav{
    margin: 0 30px;
}
.perfil-empresa-link {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

.procurar-empresas {
  width: 50%;
  margin: 10px;
  display: flex;
}

.card-empresa {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 90%;
}

.skills {
  width: 100%;
  display: flex;
}

.v-slide-group {
  :deep(.v-slide-group__content) {
    display: flex;
    justify-content: center;
  }
}
</style>