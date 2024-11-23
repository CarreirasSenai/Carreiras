<template>
  <Navbar />
  <div class="ma-3">
    <Home />
    <FiltroVagas />
    <Vagas />
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  computed: {
    auth() {
      return useAuthStore();
    },
  },
  mounted() {
    this.auth.autenticacao();
  },
}
</script>