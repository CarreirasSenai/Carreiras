<template>
    <Navbar />
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-lg ma-4">
                    <v-card-title class="pr-2 opacity-100 bg-deep-purple-accent-4 observavel d-flex align-center">
                        {{ vaga.titulo }}
                        <v-spacer></v-spacer>
                        <v-chip size="small" variant="outlined"
                            class="mr-15 bg-deep-purple-accent-2 position-absolute right-0" v-model="snackbar">
                            Copiado para área de transferência!
                        </v-chip>
                        <v-btn size="small" icon="mdi-share-variant" variant="tonal" @click="compartilhar"></v-btn>
                    </v-card-title>
                    <v-card-text class="d-flex flex-column ga-2 pa-4 pl-6 pr-6">
                        <div class="d-flex align-center ga-2 flex-wrap">
                            <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Local:</div>
                            <div class="text-subtitle-1">{{ vaga.cidade }}, {{ vaga.estado }}</div>
                        </div>

                        <div class="d-flex align-center ga-2 flex-wrap">
                            <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Contrato:</div>
                            <div class="text-subtitle-1">{{ vaga.contrato }}</div>
                        </div>

                        <div class="d-flex align-center ga-2 flex-wrap">
                            <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Modalidade:</div>
                            <div class="text-subtitle-1">{{ vaga.modalidade }}</div>
                        </div>

                        <div class="d-flex align-center ga-2 flex-wrap" v-if="vaga.nivel">
                            <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Senioridade:</div>
                            <div class="text-subtitle-1">{{ vaga.nivel }}</div>
                        </div>

                        <div class="d-flex align-center ga-2 flex-wrap" v-if="vaga.remuneracao">
                            <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Remuneração:</div>
                            <div class="text-subtitle-1">{{ vaga.remuneracao }}</div>
                        </div>

                        <div class="d-flex align-center ga-2 flex-wrap" v-if="habilidadesExigidas.length">
                            <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Habilidades Exigidas:</div>
                            <v-chip size="small" v-for="(habilidade, index) in habilidadesExigidas" :key="index">
                                {{ habilidade }}
                            </v-chip>
                        </div>

                        <div class="d-flex align-center ga-2 flex-wrap" v-if="habilidadesOpcionais.length">
                            <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Habilidades Opcionais:</div>
                            <v-chip size="small" v-for="(habilidade, index) in habilidadesOpcionais" :key="index">
                                {{ habilidade }}
                            </v-chip>
                        </div>

                        <div class="d-flex align-center ga-2 flex-wrap mt-2">
                            <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Visão Geral da Vaga:</div>
                            <div class="text-subtitle-1">
                                {{ vaga.descricao }}
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions class="d-flex justify-space-between">
                        <div class="d-flex flex-wrap ga-2">
                            <v-btn class="bt-primario" :to="`/perfil-empresa?requisicao=empresa&id=${this.empresa.id}`">Inscrever-se</v-btn>
                        </div>
                        <router-link :to="`/perfil-empresa?requisicao=empresa&id=${this.empresa.id}`"
                            class="text-black text-decoration-none">
                            <div class="d-flex align-center justify-center ga-2">
                                {{ empresa.nome_fantasia }}
                                <img :src="empresa.foto" width="50px" class="rounded-circle">
                            </div>
                        </router-link>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <Footer />
</template>

<script>
import axios from 'axios';
import { useCandidatoStore } from '@/stores/candidato';

export default {
    data: () => ({
        id: '',
        vaga: '',
        habilidadesExigidas: [],
        habilidadesOpcionais: [],
        snackbar: false,
        empresa: '',
    }),

    computed: {
        user() {
            return useCandidatoStore();
        },
    },

    mounted() {
        this.user.userLogado();
    },

    created() {
        this.id = this.$route.query.id;
        this.mostrarVaga();
    },

    methods: {
        async mostrarVaga() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/read`, {
                    params: {
                        id: this.id,
                    }
                });

                this.vaga = response.data.result;
                console.log(this.vaga);
                this.getUserEmpresa();

                // Parse habilidades_exigidas e habilidades_opcionais se existirem
                if (this.vaga.habilidades_exigidas) {
                    this.habilidadesExigidas = JSON.parse(this.vaga.habilidades_exigidas) || [];
                }
                if (this.vaga.habilidades_opcionais) {
                    this.habilidadesOpcionais = JSON.parse(this.vaga.habilidades_opcionais) || [];
                }
            } catch (error) {
                console.log('Erro ao buscar!', error.response);
            }
        },

        compartilhar() {
            const url = `${import.meta.env.VITE_FRONTEND_URL}/detalhes-vaga?id=${this.vaga.id}&titulo=${encodeURIComponent(this.vaga.titulo)}`;

            // Utiliza a API de Clipboard para copiar o URL
            navigator.clipboard.writeText(url)
                .then(() => {
                    console.log(url);

                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erro ao copiar o URL para a área de transferência: ', err);
                });
        },

        async getUserEmpresa() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/empresa/read`, {
                    params: {
                        id: this.vaga.id_empresa,
                    },
                    withCredentials: true
                });

                this.empresa = response.data.usuario;

                const path = `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/`;
                const avatarPadrao = '/src/assets/avatar.png';
                const capaPadrao = '/src/assets/capa (1).png';

                const foto = this.empresa.foto;
                const capa = this.empresa.capa;

                this.empresa.foto = foto ? path + foto : avatarPadrao;
                this.empresa.capa = capa ? path + capa : capaPadrao;

                // console.log(this.empresa);                

            } catch (error) {
                console.error('Erro ao obter dados do usuário', error.response.data);
            }
        }
    }
}
</script>
