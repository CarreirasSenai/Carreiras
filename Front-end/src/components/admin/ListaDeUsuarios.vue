<template>
  <div style="height: 100%">
    <Navbar />
    <v-container fluid class="fill-height main-container">
      <div class="mt-4">
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
        <div class="card-do-usuario rounded" v-for="n in 6" :key="n">
          <div class="corpo-card-usuario">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>Robsoh Hush</h3>
            </div>
          </div>
          <div class="email-usuario">
            <span class="locaCor">robsoh56@gmail.com</span>
          </div>
          <div class="funcao-usuario">
            <span class="locaCor">Administrador</span>
          </div>
          <div class="status" />
          <div class="dotsNav"><MenuAdminUsuario /></div>
        </div>
        <!-- <div class="card-do-usuario rounded">
          <div class="corpo-card-usuario">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>Whirlpool Corporation</h3>
            </div>
          </div>
          <div class="localizacao-usuario">Localização: Joinville</div>
          <img class="status" src="/src/assets/statusONteste.png" alt="" />
          <MenuAdminusuario />
        </div>
        <div class="card-do-usuario rounded">
          <div class="corpo-card-usuario">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>Dohler S.A</h3>
            </div>
          </div>
          <div class="localizacao-usuario">Localização: Joinville</div>
          <img class="status" src="/src/assets/statusONteste.png" alt="" />
          <MenuAdminusuario />
        </div>
        <div class="card-do-usuario rounded">
          <div class="corpo-card-usuario">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>NIDEC GLOBAL APPLIANCE BRASIL LTDA</h3>
            </div>
          </div>
          <div class="localizacao-usuario">Localização: Joinville</div>
          <img class="status" src="/src/assets/statusONteste.png" alt="" />
          <MenuAdminusuario />
        </div> -->
      </div>
    </v-container>
  </div>
</template>
<script>
import MenuAdminUsuario from "./MenuAdminUsuario.vue";
export default {
  components: { MenuAdminUsuario },
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

.list-usuario {
  display: inherit;
  flex-direction: inherit;
  gap: 15px;
  width: 100%;
  padding: 30px 50px;
}

.card-do-usuario {
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

.corpo-card-usuario {
  display: flex;
  align-items: center;
  flex: 1;
}

.email-usuario {
  margin-left: auto;
  margin: 0 130px;
  text-align: center;
}

.funcao-usuario {
  margin-left: auto;
  margin: 0 120px;
  text-align: center;
}

.locaCor {
  font-weight: 400;
}
.dotsNav {
  margin: 0 30px;
}
.perfil-usuario-link {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

.procurar-Usuarios {
  width: 50%;
  margin: 10px;
  display: flex;
}

.card-usuario {
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