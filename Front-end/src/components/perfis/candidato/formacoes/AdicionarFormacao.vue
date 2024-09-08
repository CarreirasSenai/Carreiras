<template>
    <div class="text-center div-button-edit">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="bt-add" variant="outlined" v-bind="activatorProps">
                    Adicionar
                </v-btn>
            </template>

            <v-form class="ma-5 text-center" @submit.prevent="criarFormacao">
                <v-card>
                    <v-card-title class="d-flex align-center ga-2 cor-primaria">
                        <i class="mdi mdi-school"></i>
                        Adicionar Formação
                    </v-card-title>
                    <v-card-text class="text-start">
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-autocomplete v-model="form.nivel" label="Nível" :items="niveisFormacao"
                                    :rules="[rules.nivel]" required></v-autocomplete>

                                <v-text-field v-model="form.formacao" label="Formação" :rules="[rules.formacao]"
                                    required></v-text-field>

                                <v-text-field v-model="form.unidade" label="Unidade de Ensino" :rules="[rules.unidade]"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.inicio" type="month" label="Início" :rules="[rules.inicio]"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.fim" type="month" label="Fim" :rules="[rules.fim]"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
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
        niveisFormacao: [
            "Ensino Fundamental",
            "Ensino Médio",
            "Curso Técnico",
            "Ensino Superior (Graduação)",
            "Pós-Graduação",
            "Mestrado",
            "Doutorado",
            "Pós-Doutorado"
        ],
        form: {
            nivel: 'Ensino Superior (Graduação)',
            formacao: 'Analise e Desenvolvimento de Sistemas',
            unidade: 'Unisenai',
            inicio: '2024-09',
            fim: '2024-09'
        },
        rules: {
            nivel: value => !!value || 'O campo Nível é obrigatório.',
            formacao: value => !!value || 'O campo Formação é obrigatório.',
            unidade: value => !!value || 'O campo Unidade de Ensino é obrigatório.',
            inicio: value => !!value || 'O campo Início é obrigatório.',
            fim: value => !!value || 'O campo Fim é obrigatório.',
        }
    }),
    props: {
        MostrarFormacoes: {
            type: Function,
            required: true
        }
    },
    methods: {
        async criarFormacao(event) {
            console.clear();
            const dados = await event;

            // alert(JSON.stringify(dados, null, 2))

            if (dados.valid === true) {
                console.log(this.form);

                try {
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/formacao/create`, {
                        dados: this.form,
                    }, { withCredentials: true });

                    console.log(response.data);

                    this.dialog = false;

                    this.MostrarFormacoes();

                } catch (error) {
                    console.error('Erro', error.response.data);
                }
            }
        }
    }
}
</script>