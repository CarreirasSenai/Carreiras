<template>
    <v-col cols="12" md="12">
        <v-card>
            <v-card-title class="d-flex align-center cor-primaria">
                <h3>Sobre mim</h3>
            </v-card-title>
            <v-card-text class="mx-4" style="padding-bottom: 60px;">
                <span v-html="Dados.descricao ? Dados.descricao : 'Adicione uma descrição.'"></span>
                <EditarDescCandidato v-if="grupo === 'candidato'" />
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        grupo: ''
    }),
    props: {
        Dados: {
            type: Object,
            required: true
        },
    },
    mounted() {
        this.grupo = localStorage.getItem('grupo');
    },
}
</script>