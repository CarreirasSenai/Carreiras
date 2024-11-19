<template>
  <Navbar />
  <div class="ma-3">
    <Home />
    <FiltroVagas />
    <Vagas />
  </div>
  <Footer />
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  mounted() {
    this.auth.autenticacao();
  },
};
</script>

<style scoped>
</style>