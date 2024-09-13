<template>
    <v-col cols="12" md="12">
        <v-card>
            <v-card-title class="d-flex align-center cor-primaria">
                <!-- <i class="mdi mdi-account mr-2"></i> -->
                <h3>Sobre mim</h3>
            </v-card-title>
            <v-card-text class="mx-4" style="padding-bottom: 60px;">
                <span v-html="user.dadosUser.descricao ? user.dadosUser.descricao : 'Adicione uma Descrição.'"></span>
                <EditarDescCandidato />
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';

export default {
    mounted() {
        const user = useCandidatoStore();
        user.userLogado();
    },
    computed: {
        user() {
            return useCandidatoStore();
        }
    },
}
</script>

<style>
* {
    /* border: 1px solid red; */
}
</style>