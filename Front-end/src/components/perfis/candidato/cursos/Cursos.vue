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
                            <EditarCursos :MostrarFormacoes="mostrarFormacoes" :Formacoes="items" />
                        </v-card>
                    </v-col>
                    <span v-if="!formacoes.length" class="ma-4">Adicione um curso.</span>
                </v-row>
                <AdicionarCurso :MostrarFormacoes="mostrarFormacoes" />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
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
    mounted() {
        this.mostrarFormacoes();
    },
    methods: {
        async mostrarFormacoes() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/curso/read`, {
                    withCredentials: true
                });

                console.log('Array de Cursos:', response.data);
                this.formacoes = response.data.result;

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