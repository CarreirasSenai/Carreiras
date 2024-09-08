<template>
    <v-col cols="12" md="6">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <i class="mdi mdi-star cor-primaria mr-2"></i>
                <h3 class="cor-primaria">Habilidades</h3>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col cols="12" lg="6" md="12" sm="12" class="bloco" v-for="(habilidade, index) in habilidades"
                        :key="index">
                        <v-card variant="tonal">
                            <v-card-text> {{ habilidade }} </v-card-text>
                            <EditarHabilidade />
                        </v-card>
                    </v-col>
                </v-row>
                <AdicionarHabilidade />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>

<script>
export default {
    data: () => ({
        habilidades: '',
    })
}
</script>