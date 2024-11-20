<template>
    <v-col cols="12" md="6">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <i class="mdi mdi-briefcase cor-primaria mr-2"></i>
                <h3>Experiências</h3>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col cols="12" class="bloco" v-for="items in formacoes" :key="items">
                        <v-card variant="tonal">
                            <v-card-title>{{ items.cargo }}</v-card-title>
                            <v-card-subtitle>{{ items.contrato }}</v-card-subtitle>
                            <v-card-text>
                                <ul class="mx-5">
                                    <!-- Itera sobre o array de atividades e exibe cada item -->
                                    <li v-for="(atividade, index) in items.atividades" :key="index">
                                        {{ atividade }}
                                    </li>
                                </ul>
                            </v-card-text>
                            <v-card-text>
                                <strong>{{ items.empresa }} </strong><br>
                                {{ formatarData(items.inicio) }} - {{ formatarData(items.termino) }}
                            </v-card-text>
                            <EditarExperiencias :MostrarExperiencias="mostrarExperiencias" :Experiencias="items" v-if="user.dadosUser.id === idCandidato"/>
                        </v-card>
                    </v-col>
                    <span v-if="!formacoes.length" class="ma-4">Adicione uma experiência.</span>
                </v-row>
                <AdicionarExperiencia :MostrarExperiencias="mostrarExperiencias" v-if="user.dadosUser.id === idCandidato"/>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>


<script>
import axios from 'axios';
import { useCandidatoStore } from '@/stores/candidato';

export default {
    data() {
        return {
            idCandidato: '',
            formacoes: [
                {
                    cargo: '',
                    empresa: '',
                    atividades: [],
                    contrato: '',
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
        this.mostrarExperiencias();
    },
    methods: {
        async mostrarExperiencias() {
            const id = this.$route.query.id;

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/experiencia/read`, {
                    params: {
                        id: id,
                    },
                    withCredentials: true
                });

                // Certifique-se de que atividades seja um array
                this.formacoes = response.data.result.map(experiencia => {
                    if (typeof experiencia.atividades === 'string') {
                        experiencia.atividades = JSON.parse(experiencia.atividades);
                    }
                    return experiencia;
                });

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