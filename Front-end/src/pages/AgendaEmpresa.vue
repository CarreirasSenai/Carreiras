<template>
  <Navbar />
  <AgendaEmpresa />
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useCandidatoStore } from '@/stores/candidato';import Navbar from '../components/menu/Navbar.vue';
import AgendaEmpresa from '../components/agenda/AgendaEmpresa/Calendario.vue';

export default {
    components: {
        Navbar,
        AgendaEmpresa,
    },
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
</script>
