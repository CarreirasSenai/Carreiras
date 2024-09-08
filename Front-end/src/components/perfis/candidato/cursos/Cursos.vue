<template>
    <v-col cols="12" md="6">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <i class="mdi mdi-school cor-primaria mr-2"></i>
                <h3>Cursos</h3>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col cols="12" lg="6" md="12" sm="12" class="bloco">
                        <v-card variant="tonal">
                            <v-card-title>Inglês</v-card-title>
                            <v-card-subtitle>Profissionalizante</v-card-subtitle>
                            <v-card-text>Senac <br> De 2020 a 2024</v-card-text>
                            <EditarCursos />
                        </v-card>
                    </v-col>
                </v-row>
                <AdicionarCurso />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>