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
        <v-empty-state v-if="empty" headline="Oops, 404" title="Página não encontrada"
            text="A página que você estava procurando não existe" icon="mdi-emoticon-dead">
        </v-empty-state>
    </div>
</template>

<script>
import { usePesquisaUsuarioStore } from '@/stores/pesquisaUsuario';

export default {
    data: () => ({
        dadosCarregados: false,
        empty: false,
    }),
    computed: {        
        pesquisaUser() {
            return usePesquisaUsuarioStore();
        },
    },
    created() {
        // this.auth.autenticacao();
    },
    methods: {
        atualizarDadosCarregados(valor) {
            this.dadosCarregados = valor;
        }
    }
}
</script>