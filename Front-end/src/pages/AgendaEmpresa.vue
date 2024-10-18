<template>
  <Navbar />
  <AgendaEmpresa />
</template>

<!-- <script>
import { useAuthStore } from '@/stores/auth';
import { useCandidatoStore } from '@/stores/candidato';

export default {
    computed: {
        auth() {
            return useAuthStore();
        },
        user() {
            return useCandidatoStore();
        },
    },
    mounted() {
        this.auth.autenticacao();
        this.user.userLogado();
    },
}
</script> -->
