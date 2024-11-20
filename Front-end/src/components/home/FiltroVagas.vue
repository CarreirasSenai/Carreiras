<template>
    <div class="text-start mb-3" v-if="pesquisa.visibilidadeFiltroVagas">
        <div
            class="d-flex align-center justify-space-between ga-5 bg-deep-purple-accent-4 pa-10 pl-4 pr-4 rounded-lg elevation-2">
            <h1 style="font-size: 3vh;">Resultados da Pesquisa:</h1>
            <v-btn @click="pesquisa.dialog = true" icon="mdi-filter-variant" variant="tonal" class="elevation-1"
                title="Filtrar Vagas"></v-btn>
        </div>
        <v-dialog v-model="pesquisa.dialog">
            <v-card min-width="300" max-width="400" prepend-icon="mdi-filter-variant" title="Filtrar Vagas"
                class="text-deep-purple-accent-4">
                <v-divider></v-divider>
                <v-card-text class="overflow-auto text-black">

                    <v-form @submit.prevent="pesquisa.pesquisar">
                        <v-container>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-text-field v-model="pesquisa.form.palavraChave" append-inner-icon="mdi-magnify"
                                        density="compact" label="Nome da vaga" variant="outlined" hide-details
                                        single-line>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-combobox v-model="pesquisa.form.cidade" label="Cidade" :items="municipios"
                                        variant="outlined" density="compact" hide-details ingle-line></v-combobox>
                                </v-col>
                                <!-- <v-col cols="12" sm="6">
                                    <v-select v-model="pesquisa.form.estado" label="Estado"
                                        :items="['','Tchê', 'Santa Catarina', 'Pia', 'São Paulo', 'Pão de Queijo']"
                                        variant="outlined" density="compact" hide-details ingle-line></v-select>
                                </v-col> -->
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-radio-group v-model="pesquisa.form.contrato" label="Contrato"
                                        class="d-flex align-center">
                                        <v-radio label="CLT" value="clt"></v-radio>
                                        <v-radio label="PJ" value="pj"></v-radio>
                                        <v-radio label="Estágio" value="estagio"></v-radio>
                                        <v-radio label="Outro" value=""></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-radio-group v-model="pesquisa.form.modalidade" label="Modalidade"
                                        class="d-flex align-center">
                                        <v-radio label="Presencial" value="presencial"></v-radio>
                                        <v-radio label="Híbrido" value="hibrido"></v-radio>
                                        <v-radio label="Remoto" value="remoto"></v-radio>
                                        <v-radio label="Outro" value=""></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                            <!-- <v-row>
                                <v-col cols="12">
                                    <v-combobox v-model="habilidade" :items="habilidades" label="Habilidades" chips
                                        multiple variant="outlined" density="compact"></v-combobox>
                                </v-col>
                            </v-row> -->
                            <v-row no-gutters>
                                <v-col cols="12" class="mt-3">
                                    <v-text-field v-model="pesquisa.form.remuneracao" prefix="R$" label="Remuneração"
                                        variant="outlined" density="compact" hide-details ingle-line></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <label for="data-inicio">De</label>
                                    <input type="date" v-model="pesquisa.form.dataInicio" id="data-inicio">
                                </v-col>
                                <v-col cols="6">
                                    <label for="data-fim">Até</label>
                                    <input type="date" v-model="pesquisa.form.dataFim" id="data-fim">
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="text-grey-darken-4" variant="text" text="Cancelar"
                        @click="pesquisa.dialog = false"></v-btn>
                    <v-btn class="bt-primario" variant="tonal" text="Filtrar" @click="pesquisa.pesquisar"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { usePesquisaVaga } from '@/stores/pesquisaVaga';
import { useDataHora } from '@/stores/dataHora';
import axios from 'axios';

export default {
    data() {
        return {
            dialog: false,
            habilidades: [
                'Programming',
                'Design',
                'Vue',
                'Vuetify',
            ],
            municipios: []
        }
    },

    mounted() {
        this.inputData();
        this.getMunicipios();
    },

    computed: {
        pesquisa() { return usePesquisaVaga(); },
        dataHora() { return useDataHora(); }
    },

    methods: {
        formatCurrency() {
            let value = this.pesquisa.form.remuneracao.replace(/\D/g, ''); // Remove tudo que não é número
            value = (Number(value) / 100).toFixed(2).replace('.', ','); // Converte para float e formata
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona os pontos de milhar
            this.pesquisa.form.remuneracao = value;
        },

        inputData() {
            const data = this.dataHora.ano + '-' + this.dataHora.mes + '-' + this.dataHora.dia;
            this.dataInicio = data;
            this.dataFim = data;
        },

        async getMunicipios() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/cidades`, {
                    withCredentials: true
                });

                console.log(response.data);
                this.municipios = response.data.result.map(item => item.cidade);

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        }
    },

    watch: {
        remuneracao() {
            this.formatCurrency();
        }
    },
}
</script>

<style scoped>
input {
    border: 1px solid #929292;
    color: #666;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    width: 100%;
}

label {
    color: #666;
}
</style>