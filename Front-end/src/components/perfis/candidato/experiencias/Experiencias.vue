<template>
    <v-col cols="12" md="6">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <i class="mdi mdi-briefcase cor-primaria mr-2"></i>
                <h3>Experiências Profissionais</h3>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col cols="12" lg="6" md="12" sm="12" class="bloco">
                        <v-card variant="tonal">
                            <v-card-title>Suporte Técnico</v-card-title>
                            <v-card-subtitle>Soft Master</v-card-subtitle>
                            <v-card-text>CLT <br> De 2020 a 2024</v-card-text>
                            <EditarExperiencias />
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6" md="12" sm="12" class="bloco">
                        <v-card variant="tonal">
                            <v-card-title>Chapeiro</v-card-title>
                            <v-card-subtitle>Burguer Master</v-card-subtitle>
                            <v-card-text>CLT <br> De 2020 a 2024</v-card-text>
                            <EditarExperiencias />
                        </v-card>
                    </v-col>
                </v-row>
                <AdicionarExperiencia />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>