<template>
    <div class="text-center div-button-edit">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <button class="text-none font-weight-regular mdi mdi-pencil bt-edit" variant="tonal"
                    v-bind="activatorProps"></button>
            </template>

            <v-form class="ma-5 text-center" @submit.prevent="submitUpdate">
                <v-card class="card-habilidades">
                    <v-card-title class="d-flex align-center ga-2 cor-primaria">
                        <i class="mdi mdi-star"></i>
                        Editar Habilidades
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
            id: '',
            habilidades: []
        },
        rules: {
            geral: value => !!value || 'Insira pelo menos uma habilidade.',
        }
    }),
    props: {
        MostrarHabilidades: {
            type: Function,
            required: true
        },
        Habilidades: {
            type: Array,
            required: true
        },
        Id: Number
    },
    mounted() {
        this.form.id = this.Id;
        console.log(this.form.id);
        this.form.habilidades = this.Habilidades;
    },
    methods: {
        async submitUpdate(event) {
            console.clear();
            const dados = await event;

            if (dados.valid === true) {
                console.log(this.form);

                try {
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/habilidade/update`, {
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

<style lang="scss" scoped>
.div-button-edit {
    display: flex;
    justify-content: end;
}

.bt-edit {
    text-transform: uppercase;
    margin: 10px 0;
}
</style>