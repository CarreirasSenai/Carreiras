<template>
  <div style="height: 100%">
    <Navbar />
    <v-container fluid class="fill-height main-container">
      <div class="mt-4">
        <h1>Lista de Empresas</h1>
      </div>

      <div class="search-field">
        <v-card-text>
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
            label="Digite um cargo, cidade, estado." variant="solo" hide-details single-line
            @click:append-inner="onClick">
          </v-text-field>
        </v-card-text>
      </div>
      
      <div class="list-empresa">
        <div class="card-do-empresa rounded">
          <div class="corpo-card-empresa">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>TOTVS - Sistemas Inteligentes</h3>
            </div>
          </div>
          <div>
            <ul class="localizacao-empresa">
              <li>Localização:</li>
            </ul>
          </div>
          <div>
            <a href="/perfil-empresa">
              <v-icon
                class="perfil-empresa-link"
                icon="mdi-arrow-top-right"
                color="black"
              />
            </a>
          </div>
        </div>
        <div class="card-do-empresa rounded">
          <div class="corpo-card-empresa">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>Whirlpool Corporation</h3>
            </div>
          </div>
          <div>
            <ul class="localizacao-empresa">
              <li>Localização:</li>
            </ul>
          </div>
          <div>
            <a href="/perfil-empresa">
              <v-icon
                class="perfil-empresa-link"
                icon="mdi-arrow-top-right"
                color="black"
              />
            </a>
          </div>
        </div>
        <div class="card-do-empresa rounded">
          <div class="corpo-card-empresa">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>Dohler S.A</h3>
            </div>
          </div>
          <div>
            <ul class="localizacao-empresa">
              <li>Localização:</li>
            </ul>
          </div>
          <div>
            <a href="/perfil-empresa">
              <v-icon
                class="perfil-empresa-link"
                icon="mdi-arrow-top-right"
                color="black"
              />
            </a>
          </div>
        </div>
        <div class="card-do-empresa rounded">
          <div class="corpo-card-empresa">
            <v-avatar color="surface-variant ma-3" size="50"></v-avatar>
            <div>
              <h3>NIDEC GLOBAL APPLIANCE BRASIL LTDA</h3>
            </div>
          </div>
          <div>
            <ul class="localizacao-empresa">
              <li>Localização:</li>
            </ul>
          </div>
          <div>
            <a href="/perfil-empresa">
              <v-icon
                class="perfil-empresa-link"
                icon="mdi-arrow-top-right"
                color="black"
              />
            </a>
          </div>
        </div>
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
  width: 100rem;
  flex-wrap: wrap;
  max-width: 100%;
  position: relative;
}

.corpo-card-empresa {
  display: inherit;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.localizacao-empresa {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px auto;

  li {
    align-items: center;
    padding: 5px 25px;
    border-radius: 10px;
    user-select: none;
  }
}

.perfil-empresa-link {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
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