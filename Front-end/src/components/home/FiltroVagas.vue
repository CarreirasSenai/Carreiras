<template>
    <div class="text-center pa-4">
        <v-btn @click="dialog = true" prepend-icon="mdi-filter-variant" class="bt-primario text-white">
            Filtrar
        </v-btn>

        <v-dialog v-model="dialog">
            <v-card min-width="300" max-width="400" prepend-icon="mdi-filter-variant" title="Filtrar Vagas"
                class="text-deep-purple-accent-4">
                <v-divider></v-divider>
                <v-card-text class="overflow-auto text-black">

                    <v-form @submit.prevent="pesquisar">
                        <v-container>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-text-field v-model="pesquisa" append-inner-icon="mdi-magnify" density="compact"
                                        label="Pesquise uma palavra chave" variant="outlined" hide-details single-line
                                        @click:append-inner="pesquisar">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select label="Cidade"
                                        :items="['Jaraguá', 'Joinville', 'Blumenal', 'Rio do Sul', 'Timbó', 'Indaial']"
                                        variant="outlined" density="compact" hide-details ingle-line></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select label="Estado"
                                        :items="['Tchê', 'Santa Catarina', 'Pia', 'São Paulo', 'Pão de Queijo']"
                                        variant="outlined" density="compact" hide-details ingle-line></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-radio-group label="Contrato" class="d-flex align-center">
                                        <v-radio label="CLT" value="clt"></v-radio>
                                        <v-radio label="PJ" value="pj"></v-radio>
                                        <v-radio label="Estágio" value="estagio"></v-radio>
                                        <v-radio label="Outro" value="outro"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-radio-group label="Modalidade" class="d-flex align-center">
                                        <v-radio label="Presencial" value="presencial"></v-radio>
                                        <v-radio label="Híbrido" value="hibrido"></v-radio>
                                        <v-radio label="Home Office" value="homeoffice"></v-radio>
                                        <v-radio label="Outro" value="outro"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-combobox v-model="select" :items="items" label="Habilidades" chips multiple
                                        variant="outlined" density="compact"></v-combobox>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-text-field label="Remuneração" prepend-icon="mdi-currency-usd" variant="outlined"
                                        density="compact" hide-details ingle-line></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="text-grey-darken-4" variant="text" text="Cancelar" @click="dialog = false"></v-btn>
                    <v-btn class="bt-primario" variant="tonal" text="Filtrar" @click="dialog = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            pesquisa: '',
            select: ['Vuetify', 'Programming'],
            items: [
                'Programming',
                'Design',
                'Vue',
                'Vuetify',
            ],
        }
    },
    methods: {
        async pesquisar() {
            try {
                const response = await axios.get('http://localhost:4000/vaga/pesquisa', {
                    pesquisa: this.pesquisa,
                });
                console.log('Busca enviada!', response.data);

            } catch (error) {
                console.log('Erro ao enviar busca!', error.response);
            };
        },
    }
}
</script>

<style>
* {
    /* border: 1px solid red; */
}

.mdi-filter-variant, .mdi-currency-usd {
    color: #6200EA !important;
}
</style>