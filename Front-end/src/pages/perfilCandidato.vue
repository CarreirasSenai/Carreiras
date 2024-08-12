<template>
    <Navbar />
    <FotoCapa />
    <v-row class="ma-5 mb-0">
        <v-col cols="12" md="6" sm="6" xs="12">
            <InformacoesPessoais />
        </v-col>
        <v-col cols="12" md="6" sm="6" xs="12">
            <LinksCandidato />
        </v-col>
    </v-row>
    <v-divider class="ma-7"></v-divider>
    <Curriculo />
</template>

<script setup lang="ts">
import Curriculo from '@/components/perfis/candidato/Curriculo.vue';
import InformacoesPessoais from '@/components/perfis/candidato/InformacoesPessoais.vue';
import LinksCandidato from '@/components/perfis/candidato/LinksCandidato.vue';
</script>

<style>
* {
    /* border: 1px solid red; */
}

.mdi {
    color: #6732d2af;
}

.mdi-pencil {
    color: #6732d2af !important;
}

.mdi-pencil:hover {
    color: #6732d2 !important;
}

.mdi:hover {
    color: #6732d2;
}
</style>