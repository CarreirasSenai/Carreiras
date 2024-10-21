<template>
    <v-col cols="12" md="6">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <i class="mdi mdi-school cor-primaria mr-2"></i>
                <h3>Cursos</h3>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col cols="12" lg="6" md="12" sm="12" class="bloco" v-for="items in formacoes" :key="items">
                        <v-card variant="tonal">
                            <v-card-title>{{ items.nome }}</v-card-title>
                            <v-card-text>
                                {{ items.lugar }} <br>
                                {{ formatarData(items.inicio) }} - {{ formatarData(items.termino) }}
                            </v-card-text>
                            <EditarCursos :MostrarFormacoes="mostrarFormacoes" :Formacoes="items" v-if="user.dadosUser.id === idCandidato"/>
                        </v-card>
                    </v-col>
                    <span v-if="!formacoes.length" class="ma-4">Adicione um curso.</span>
                </v-row>
                <AdicionarCurso :MostrarFormacoes="mostrarFormacoes" v-if="user.dadosUser.id === idCandidato"/>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import axios from 'axios';

export default {
    data() {
        return {
            idCandidato: '',
            formacoes: [
                {
                    nome: '',
                    lugar: '',
                    inicio: '',
                    termino: ''
                }
            ],
        };
    },
    computed: {
        user() {
            return useCandidatoStore();
        }
    },
    mounted() {
        this.mostrarFormacoes();
    },
    methods: {
        async mostrarFormacoes() {
            const id = this.$route.query.id;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/curso/read`, {
                    params: {
                        id: id,
                    },
                    withCredentials: true
                });

                console.log('Array de Cursos:', response.data);
                this.formacoes = response.data.result;
                this.idCandidato = response.data.result[0].id_candidato;

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },

        formatarData(data) {
            if (data && data.length === 7) {
                const [ano, mes] = data.split('-');
                const date = new Date(ano, mes - 1);
                const mesFormatado = ('0' + (date.getMonth() + 1)).slice(-2);

                return `${mesFormatado}/${ano}`;
            }
            return data;
        }
    }
};
</script>