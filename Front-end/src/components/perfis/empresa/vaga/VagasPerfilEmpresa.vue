<template>
    <div class="ma-4 mb-2 d-flex justify-space-between align-center">
        <h1 style="font-size: 3vh;">Vagas da Empresa</h1>
        <AdicionarVaga :MostrarVagas="mostrarVagas" />
    </div>

    <v-divider class="ml-4 mr-4"></v-divider>

    <v-card>
        <v-data-iterator :items="vagas" :items-per-page="3" :search="search">
            <template v-slot:header>
                <v-toolbar class="px-2">
                    <v-text-field v-model="search" density="comfortable" placeholder="Search"
                        prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo" clearable
                        hide-details></v-text-field>
                </v-toolbar>
            </template>

            <template v-slot:default="{ items }">
                <v-container class="pa-2" fluid>
                    <v-row class="ma-1">
                        <v-col cols="12" lg="4" md="6" sm="6" v-for="vaga in vagas" :key="vaga.id">
                            <v-card class="elevation-2 rounded-lg observavel" style="border-color: #6200EA !important;">
                                <v-card-title class="opacity-100 bg-deep-purple-accent-4 rounded-lg observavel">
                                    {{ vaga.titulo }}
                                </v-card-title>
                                <v-card-text class="pa-4" style="min-height: 120px;">
                                    <v-row dense>
                                        <v-col cols="6">
                                            <p class="observavel">
                                                <span class="mdi mdi-map-marker text-h6 text-grey-darken-1"></span>
                                                &nbsp;{{ vaga.cidade }}, {{ vaga.estado }}
                                            </p>
                                        </v-col>
                                        <v-col cols="6">
                                            <p class="observavel">
                                                <span class="mdi mdi-clipboard-text text-h6 text-grey-darken-1"></span>
                                                &nbsp;{{ vaga.contrato }}
                                            </p>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col cols="6">
                                            <p class="observavel">
                                                <span class="mdi mdi-laptop text-h6 text-grey-darken-1"></span>
                                                &nbsp;{{ vaga.modalidade }}
                                            </p>
                                        </v-col>
                                        <v-col cols="6">
                                            <p class="observavel">
                                                <span class="mdi mdi-currency-brl text-h6 text-grey-darken-1"></span>
                                                &nbsp;{{ vaga.remuneracao }}
                                            </p>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col cols="6">
                                            <p class="observavel">
                                                <span class="mdi mdi-medal text-h6 text-grey-darken-1"></span>
                                                &nbsp;{{ vaga.nivel }}
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <small
                                    class="position-absolute top-0 right-0 ma-2 text-white observavel bg-deep-purple-accent-3 pa-1 rounded-lg elevation-2 data-vaga">
                                    {{ formatarDataRelativa(vaga.data_atu) }}
                                </small>
                                <v-card-actions class="d-flex justify-space-between">
                                    <ModalDetalhesVaga :Vagas="vaga" />
                                    <ModalCandidatosVagas />
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </template>

            <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                <div class="d-flex align-center justify-center pa-4">
                    <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
                        @click="prevPage"></v-btn>

                    <div class="mx-2 text-caption">
                        Page {{ page }} of {{ pageCount }}
                    </div>

                    <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal"
                        rounded @click="nextPage"></v-btn>
                </div>
            </template>
        </v-data-iterator>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            search: '',
            vagas: [],
        };
    },
    mounted() {
        this.mostrarVagas();
    },
    methods: {
        async mostrarVagas() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/read`, {
                    withCredentials: true
                });

                console.log(response.data);
                this.vagas = response.data.result;

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },
        
        formatarDataRelativa(data) {
            const agora = new Date();
            const dataPassada = new Date(data);

            const diferencaTempo = agora - dataPassada;
            const segundos = Math.floor(diferencaTempo / 1000);
            const minutos = Math.floor(segundos / 60);
            const horas = Math.floor(minutos / 60);
            const dias = Math.floor(horas / 24);
            const semanas = Math.floor(dias / 7);
            const meses = Math.floor(dias / 30);
            const anos = Math.floor(meses / 12);

            if (dias === 0) {
                return 'Hoje';
            } else if (dias === 1) {
                return 'Há 1 dia';
            } else if (dias < 7) {
                return `Há ${dias} dias`;
            } else if (semanas === 1) {
                return 'Há 1 semana';
            } else if (semanas < 5) {
                return `Há ${semanas} semanas`;
            } else if (meses === 1) {
                return 'Há 1 mês';
            } else if (meses < 12) {
                return `Há ${meses} meses`;
            } else if (anos === 1) {
                return 'Há 1 ano';
            } else {
                return `Há ${anos} anos`;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.box-shadow {
    box-shadow: 0 2px 4px gray;
}

.bt-salvar {
    background-color: #6200EA;
    color: white;
    border-color: #6200EA;
}

@media(max-width:600px) {
    .row-rev div:nth-child(2) {
        /* flex-direction: column-reverse; */
        display: flex;
        justify-content: start;
    }
}
</style>