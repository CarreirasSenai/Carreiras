<template>
<Navbar />
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import { usePesquisaVaga } from '@/stores/pesquisaVaga';

export default {
  computed: {
    user() { return useCandidatoStore(); },
    pesquisa() { return usePesquisaVaga(); },
  },
}
import { useAuthStore } from '@/stores/auth';
import { useCandidatoStore } from '@/stores/candidato';

// export default {
//   computed: {
//     auth() {
//       return useAuthStore();
//     },
//     user() {
//       return useCandidatoStore();
//     },
//   },
//   mounted() {
//     this.auth.autenticacao();
//     this.user.userLogado();
//   },
// }
</script>