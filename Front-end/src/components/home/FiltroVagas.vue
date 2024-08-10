<template>
    <div class="text-start ma-5" v-if="pesquisa.visibilidadeFiltroVagas">   
        <div class="d-flex align-center justify-space-between">
            <h1 class="text-deep-purple-accent-4" style="font-size: 3vh;">Resultados da Pesquisa:</h1>
            <v-btn @click="dialog = true" icon="mdi-filter-variant" class="bg-deep-purple-accent-3"></v-btn>
        </div>
        <v-dialog v-model="dialog">
            <v-card min-width="300" max-width="400" prepend-icon="mdi-filter-variant" title="Filtrar Vagas"
                class="text-deep-purple-accent-4">
                <v-divider></v-divider>
                <v-card-text class="overflow-auto text-black">

                    <v-form @submit.prevent="filtrarVaga">
                        <v-container>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-text-field v-model="chave" append-inner-icon="mdi-magnify" density="compact"
                                        label="Pesquise uma palavra chave" variant="outlined" hide-details single-line>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="cidade" label="Cidade"
                                        :items="['Jaraguá', 'Joinville', 'Blumenal', 'Rio do Sul', 'Timbó', 'Indaial']"
                                        variant="outlined" density="compact" hide-details ingle-line></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="estado" label="Estado"
                                        :items="['Tchê', 'Santa Catarina', 'Pia', 'São Paulo', 'Pão de Queijo']"
                                        variant="outlined" density="compact" hide-details ingle-line></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-radio-group v-model="contrato" label="Contrato" class="d-flex align-center">
                                        <v-radio label="CLT" value="clt"></v-radio>
                                        <v-radio label="PJ" value="pj"></v-radio>
                                        <v-radio label="Estágio" value="estagio"></v-radio>
                                        <v-radio label="Outro" value="outro"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-radio-group v-model="modalidade" label="Modalidade" class="d-flex align-center">
                                        <v-radio label="Presencial" value="presencial"></v-radio>
                                        <v-radio label="Híbrido" value="hibrido"></v-radio>
                                        <v-radio label="Home Office" value="homeoffice"></v-radio>
                                        <v-radio label="Outro" value="outro"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-combobox v-model="habilidade" :items="habilidades" label="Habilidades" chips
                                        multiple variant="outlined" density="compact"></v-combobox>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-text-field v-model="remuneracao" label="Remuneração"
                                        prepend-icon="mdi-currency-brl" variant="outlined" density="compact"
                                        hide-details ingle-line></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="text-grey-darken-4" variant="text" text="Cancelar" @click="dialog = false"></v-btn>
                    <v-btn class="bt-primario" variant="tonal" text="Filtrar" @click="filtrarVaga(), dialog = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { usePesquisaVaga } from '@/stores/pesquisaVaga';

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
            chave: '',
            cidade: '',
            estado: '',
            contrato: '',
            modalidade: '',
            habilidade: [],
            remuneracao: '',
        }
    },

    computed: {
        pesquisa() { return usePesquisaVaga(); },
    },

    methods: {
        filtrarVaga() {
            console.log(this.chave);
            console.log(this.cidade);
            console.log(this.estado);
            console.log(this.contrato);
            console.log(this.modalidade);
            console.log(this.habilidade);
            console.log(this.remuneracao);
        }
    }
}
</script>

<style scoped>
* {
    /* border: 1px solid red; */
}

.mdi-filter-variant {
    color: #6200EA !important;
}
</style>