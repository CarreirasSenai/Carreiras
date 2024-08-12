<template>
    <v-row class="ma-4">
        <v-col cols="12" lg="4" md="6" sm="6" v-for="n in 6" :key="n">
            <v-card class="elevation-2" title="Analista de Dados">
                <v-card-text>
                    <p><small>Local:</small> América, Joinville</p>
                    <p><small>Contrato:</small> CLT</p>
                    <p><small>Modalidade:</small> Híbrido</p>
                    <p><small>Remuneração:</small> Salário compativel com a função</p>
                </v-card-text>
                <small class="position-absolute top-0 right-0 ma-2">1 semana atrás</small>
                <v-card-actions class="d-flex justify-space-between">
                    <ModalDetalhesVaga />
                    <ModalCandidatosVagas />
                    <div class="d-flex align-center justify-center ga-2">
                        TOTVS
                        <img src="/src/assets/avatar.png" width="50px">
                    </div>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import ModalCandidatosVagas from './ModalCandidatosVagas.vue';
import ModalDetalhesVaga from './ModalDetalhesVaga.vue';
</script>

<style>
* {
    /* border: 1px solid red; */
}

@media(max-width:600px) {
    .row-rev div:nth-child(2) {
        /* flex-direction: column-reverse; */
        display: flex;
        justify-content: start;
    }
}
</style>

<!-- <p>Local: América, Joinville</p>
<p>Contrato: CLT</p>
<p>Modalidade: Híbrido</p>
<p>Remuneração: Salário compativel com a função</p> -->