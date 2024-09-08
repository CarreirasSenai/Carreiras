<template>
    <v-col cols="12" md="6">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <i class="mdi mdi-school cor-primaria mr-2"></i>
                <h3>Formações</h3>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col cols="12" lg="6" md="12" sm="12" class="bloco" v-for="items in formacoes" :key="items">
                        <v-card variant="tonal">
                            <v-card-title>{{ items.nome }}</v-card-title>
                            <v-card-subtitle>{{ items.nivel }}</v-card-subtitle>
                            <v-card-text>{{ items.lugar }}<br> {{ items.inicio }} a {{ items.termino
                                }}</v-card-text>
                            <EditarFormacoes :MostrarFormacoes="mostrarFormacoes" :IdFormacao="items.id"/>
                        </v-card>
                    </v-col>
                </v-row>
                <AdicionarFormacao :MostrarFormacoes="mostrarFormacoes"/>
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
                    nome: null,
                    nivel: null,
                    lugar: null,
                    inicio: null,
                    termino: null
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
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/formacao/read`, {
                }, { withCredentials: true });

                console.log('Array de Formações:', response.data);
                this.formacoes = response.data.result;

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },
    }
};
</script>