<template>
  <v-app>
    <v-main>
      <!-- <Loading /> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>

<style>
.mdi {
  font-size: 30px;
  cursor: pointer;
}

.cor-primaria {
  color: #6832D2;
}

.cor-secundaria {
  color: #191919;
}

.back-primario {
  background-color: #6832D2;
}

.back-secundario {
  background-color: #f0f0f0;
}
</style>