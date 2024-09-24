<template>
    <Navbar />
    <Calendario />
</template>

<script>
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
    created() {
        this.user.id = this.$route.query.id;
        this.user.requisicao = this.$route.query.requisicao;
    },
    mounted() {
        this.auth.autenticacao();
        this.user.userLogado();
        // this.user.pesquisaUser();
    },
}
</script>