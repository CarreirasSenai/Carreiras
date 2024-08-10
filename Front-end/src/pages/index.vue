<template>
  <Navbar />
  <Home v-if="visibilidadeHome" />
  <FiltroVagas v-if="visibilidadeFiltroVagas" />
  <Vagas />
</template>

<script>
export default {
  data() {
    return {
      visibilidadeHome: true,
      visibilidadeFiltroVagas: true,
    };
  },
};
</script>