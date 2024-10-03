<template>
    <div>
        <Navbar />
        <FotoCapaEmpresa @dados-carregados="atualizarDadosCarregados" />
        <div v-if="dadosCarregados">
            <VagasPerfilEmpresa />
        </div>
        <div v-else-if="!dadosCarregados" class="text-center d-flex align-center justify-center" style="height: 80vh;">
            <v-progress-circular color="deep-purple-accent-4" indeterminate :size="50"></v-progress-circular>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
    data: () => ({
        dadosCarregados: false,
    }),
    computed: {
        auth() {
            return useAuthStore();
        },
    },
    mounted() {
        this.auth.autenticacao();
    },
    methods: {
        atualizarDadosCarregados(valor) {
            this.dadosCarregados = valor;
            console.log(this.dadosCarregados);

        }
    }
}
</script>