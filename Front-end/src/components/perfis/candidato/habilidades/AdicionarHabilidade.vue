<template>
    <div class="text-center div-button-edit">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="bt-add" variant="outlined" v-bind="activatorProps">
                    Adicionar
                </v-btn>
            </template>

            <v-form class="ma-5 text-center" @submit.prevent="submitCreate">
                <v-card class="card-habilidades">
                    <v-card-title class="d-flex align-center ga-2 cor-primaria">
                        <i class="mdi mdi-star"></i>
                        Adicionar Habilidades
                    </v-card-title>
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-combobox v-model="form.habilidades" chips closable-chips multiple
                                    :rules="[rules.geral]" label="Insira um item teclando enter"></v-combobox>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Fechar" variant="plain" @click="dialog = false"></v-btn>
                        <v-btn color="Enviar" text="Salvar" variant="tonal" type="submit"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        dialog: false,
        form: {
            habilidades: ['java', 'c#', 'vue.js']
        },
        rules: {
            geral: value => !!value || 'Insira pelo menos uma habilidade.',
        }
    }),
    props: {
        MostrarHabilidades: {
            type: Function,
            required: true
        }
    },
    methods: {
        async submitCreate(event) {
            console.clear();
            const dados = await event;

            // alert(JSON.stringify(dados, null, 2))

            if (dados.valid === true) {
                console.log(this.form);

                try {
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/habilidade/create`, {
                        dados: this.form,
                    }, { withCredentials: true });

                    console.log(response.data);
                    this.dialog = false;
                    this.MostrarHabilidades();

                } catch (error) {
                    console.error('Erro', error.response.data);
                }
            }
        }
    }
}
</script>

<style>
.card-habilidades .v-field {
    min-height: 100px;
}
</style>