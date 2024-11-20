<template>
    <div class="ma-5 mb-4 d-flex justify-space-between align-center">
        <h1 style="font-size: clamp(17px, 4vw, 25px);">Vagas da Empresa</h1>
        <AdicionarVaga
            v-if="grupo === 'empresa' && user.dadosUser.id === pesquisaUser.dadosUser.id || !pesquisaUser.dadosUser.id && grupo === 'empresa'"
            :MostrarVagas="mostrarVagas" />
    </div>

    <v-card variant="text">
        <v-data-iterator :items="vagas" :items-per-page="6" :search="search">
            <template v-slot:header>
                <!-- <v-toolbar> -->
                <v-text-field v-model="search" class="mt-2 mx-5" density="compact" placeholder="Pesquise uma vaga"
                    prepend-inner-icon="mdi-magnify" variant="underlined"></v-text-field>
                <!-- </v-toolbar> -->
            </template>

            <template v-slot:default="{ items }">
                <v-row class="ma-1">
                    <v-col cols="12" lg="4" md="6" sm="6" v-for="item in items" :key="item.id">
                        <v-card class="elevation-2 rounded-lg observavel" style="border-color: #6200EA !important;">
                            <v-card-title class="opacity-100 bg-deep-purple-accent-4 rounded-lg observavel">
                                {{ item.raw.titulo }}
                            </v-card-title>
                            <v-card-text class="pa-4" style="min-height: 120px;">
                                <v-row dense>
                                    <v-col cols="6">
                                        <p class="observavel">
                                            <span class="mdi mdi-map-marker text-h6 text-grey-darken-1"></span>
                                            &nbsp;{{ item.raw.cidade }}, {{ item.raw.estado }}
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="observavel">
                                            <span class="mdi mdi-laptop text-h6 text-grey-darken-1"></span>
                                            &nbsp;{{ item.raw.modalidade }}
                                        </p>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col cols="6">
                                        <p class="observavel">
                                            <span class="mdi mdi-clipboard-text text-h6 text-grey-darken-1"></span>
                                            &nbsp;{{ item.raw.contrato }}
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="observavel">
                                            <span class="mdi mdi-medal text-h6 text-grey-darken-1"></span>
                                            &nbsp;{{ item.raw.nivel }}
                                        </p>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col cols="12">
                                        <!-- <span class="mdi mdi-school text-h4 mr-1"></span> -->
                                        <p class="observavel overflow-hidden" style="white-space: nowrap;">
                                            <v-chip
                                                v-for="(habilidade, index) in JSON.parse(item.raw.habilidades_exigidas).slice(0, 3)"
                                                :key="index" size="small" variant="outlined"
                                                color="deep-purple-accent-4" class="mr-2">
                                                {{ habilidade }}
                                            </v-chip>

                                            <!-- Caso não existam habilidades -->
                                            <v-chip v-if="JSON.parse(item.raw.habilidades_exigidas).length === 0"
                                                size="small" class="mr-2" color="white">
                                            </v-chip>
                                        </p>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <small
                                class="position-absolute top-0 right-0 ma-2 text-white observavel bg-deep-purple-accent-3 pa-1 rounded-lg elevation-2 data-vaga">
                                {{ formatarDataRelativa(item.raw.data_atu) }}
                            </small>
                            <v-card-actions class="d-flex justify-space-between">
                                <ModalDetalhesVaga :Vagas="item" :MostrarVagas="mostrarVagas" />
                                <v-spacer></v-spacer>
                                <v-chip :color="item.raw.status === 0 ? 'error' : 'success'">{{ item.raw.status
                                    === 0 ? 'Em análise' : 'Aprovada' }}</v-chip>
                                <ModalCandidatosVagas
                                    v-if="grupo === 'empresa' && user.dadosUser.id === pesquisaUser.dadosUser.id || !pesquisaUser.dadosUser.id"
                                    :Vagas="item" />
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                <div class="d-flex align-center justify-center pa-4">
                    <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
                        @click="prevPage"></v-btn>

                    <div class="mx-2 text-caption">
                        Página {{ page }} de {{ pageCount }}
                    </div>

                    <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal"
                        rounded @click="nextPage"></v-btn>
                </div>
            </template>
        </v-data-iterator>
    </v-card>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import { usePesquisaUsuarioStore } from '@/stores/pesquisaUsuario';
import axios from 'axios';

export default {
    data() {
        return {
            search: '',
            vagas: [],
            grupo: ''
        };
    },
    created() {
        console.log(this.$route.query.id);
        console.log(this.$route.query.requisicao);
    },
    mounted() {
        this.mostrarVagas();
        this.grupo = localStorage.getItem('grupo');
        console.log(this.user.dadosUser.id);
        console.log(this.grupo);
    },
    computed: {
        user() {
            return useCandidatoStore();
        },
        pesquisaUser() {
            return usePesquisaUsuarioStore();
        }
    },
    methods: {
        async mostrarVagas() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/read/empresa`, {
                    params: {
                        id: this.$route.query.id,
                        requisicao: this.$route.query.requisicao
                    },
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
* {
    // border: 1px solid red;
}

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