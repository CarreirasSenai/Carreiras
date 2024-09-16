<template>
    <div class="text-center div-button-edit">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <button class="text-none font-weight-regular mdi mdi-pencil bt-edit" variant="tonal"
                    v-bind="activatorProps"></button>
            </template>

            <v-form class="ma-5 text-center" @submit.prevent="editarFormacao">
                <v-card>
                    <v-card-title class="d-flex align-center ga-2 cor-primaria">
                        <i class="mdi mdi-school"></i>
                        Editar Formação
                    </v-card-title>
                    <v-card-text class="text-start">
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-autocomplete v-model="form.nivel" label="Nível" :items="niveisFormacao"
                                    :rules="[rules.nivel]"></v-autocomplete>

                                <v-text-field v-model="form.formacao" label="Formação" :rules="[rules.formacao]"
                                    v-if="!isFormacaoHidden"></v-text-field>

                                <v-text-field v-model="form.unidade" label="Unidade de Ensino"
                                    :rules="[rules.unidade]"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.inicio" type="month" label="Início"
                                    :rules="[rules.inicio]"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.fim" type="month" label="Fim"
                                    :rules="[rules.fim]"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn text="Excluir" variant="plain" class="border-red-accent-4"
                            @click="deletarFormacao"></v-btn>
                        <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
                        <v-btn text="Salvar" variant="tonal" type="submit"></v-btn>
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
            id: '',
            nivel: '',
            formacao: '',
            unidade: '',
            inicio: '',
            fim: ''
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
        },
        Formacoes: {
            type: Object,
            required: true
        }
    },
    computed: {
        isFormacaoHidden() {
            const niveisOcultos = [
                'Ensino Fundamental',
                'Ensino Médio'
            ];

            if (niveisOcultos.includes(this.form.nivel)) {
                this.form.formacao = '';
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.form.id = this.Formacoes.id;
        this.form.nivel = this.Formacoes.nivel;
        this.form.formacao = this.Formacoes.nome;
        this.form.unidade = this.Formacoes.lugar;
        this.form.inicio = this.Formacoes.inicio;
        this.form.fim = this.Formacoes.termino;
    },
    methods: {
        async deletarFormacao() {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/formacao/delete/${this.form.id}`, {
                    withCredentials: true,
                });

                console.log('Formação Deletada!', response.data);
                this.dialog = false;
                this.MostrarFormacoes();

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },
        async editarFormacao(event) {
            console.clear();
            const dados = await event;

            // alert(JSON.stringify(dados, null, 2))

            if (dados.valid === true) {
                console.log(this.form);

                try {
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/formacao/update`, {
                        dados: this.form,
                    }, { withCredentials: true });

                    console.log(response.data);
                    this.dialog = false;
                    this.MostrarFormacoes();

                } catch (error) {
                    console.error('Erro ao Atualizar Formação:', error.response.data);
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
    position: absolute;
    bottom: 0;
    right: 0;
}

.bt-edit {
    text-transform: uppercase;
    margin: 10px 20px;
}
</style>