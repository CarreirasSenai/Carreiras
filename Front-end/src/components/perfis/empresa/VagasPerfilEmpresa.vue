<template>
    <v-row class="ma-4 mb-1 d-flex align-center row-rev">
        <v-col cols="12" sm="6">
            <h1>Vagas da Empresa</h1>
        </v-col>
        <v-col cols="12" sm="6" class="text-end">
            <v-btn class="bt-primario">Nova Vaga</v-btn>
        </v-col>
    </v-row>
    <v-divider class="ml-7 mr-7"></v-divider>
    <v-row class="ma-4">
        <v-col cols="12" lg="4" md="6" sm="6" v-for="n in 6" :key="n">
            <v-card class="box-shadow" title="Analista de Dados">
                <v-card-text>
                    <p><small>Local:</small> América, Joinville</p>
                    <p><small>Contrato:</small> CLT</p>
                    <p><small>Modalidade:</small> Híbrido</p>
                    <p><small>Remuneração:</small> Salário compativel com a função</p>
                </v-card-text>
                <small class="position-absolute top-0 right-0 ma-2">1 semana atrás</small>
                <v-card-actions class="d-flex justify-space-between">
                    <v-btn variant="tonal">Ver Detalhes</v-btn>
                    <div class="d-flex align-center justify-center ga-2">
                        TOTVS
                        <img src="/src/assets/avatar.png" width="50px">
                    </div>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<style>
* {
    /* border: 1px solid red; */
}

.box-shadow {
    box-shadow: 0 2px 4px gray;
}

@media(max-width:600px){
    .row-rev div:nth-child(2){
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