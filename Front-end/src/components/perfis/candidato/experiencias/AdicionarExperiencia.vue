<template>
    <div class="text-center div-button-edit">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="bt-add" variant="outlined" v-bind="activatorProps">
                    Adicionar
                </v-btn>
            </template>

            <v-form class="ma-5 text-center" @submit.prevent="submitCreate">
                <v-card>
                    <v-card-title class="d-flex align-center ga-2 cor-primaria">
                        <i class="mdi mdi-briefcase"></i>
                        Adicionar Experiência
                    </v-card-title>
                    <v-card-text class="text-start">
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="form.cargo" :rules="[rules.geral]" label="Cargo"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-text-field v-model="form.empresa" :rules="[rules.geral]"
                                    label="Empresa"></v-text-field>
                            </v-col>                            

                            <v-col cols="12" md="12" class="mb-4">
                                <v-combobox v-model="form.atividades" chips closable-chips multiple label="Atividades Exercidas" messages="Insira um item teclando enter"></v-combobox>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-select v-model="form.contrato" :rules="[rules.geral]" label="Contrato"
                                    :items="['CLT', 'PJ', 'Estágio', 'Temporário', 'Aprendizagem', 'Outro']"></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.inicio" type="month" label="Início"
                                    :rules="[rules.geral]"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.fim" type="month" label="Fim"
                                    :rules="[rules.geral]"></v-text-field>
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
            cargo: '',
            empresa: '',
            contrato: '',
            atividades: ['Criação de Interfaces', 'Controle de Estoque', 'Gestão de Pessoas'],
            inicio: '',
            fim: ''
        },
        rules: {
            geral: value => !!value || 'O campo é obrigatório.',
        }
    }),
    methods: {
        async submitCreate(event) {
            console.clear();
            const dados = await event;

            // alert(JSON.stringify(dados, null, 2))

            if (dados.valid === true) {
                console.log(this.form);

                // try {
                //     const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/curso/create`, {
                //         dados: this.form,
                //     }, { withCredentials: true });

                //     console.log(response.data);

                //     this.dialog = false;

                //     this.MostrarFormacoes();

                // } catch (error) {
                //     console.error('Erro', error.response.data);
                // }
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

.bt-add {
    background-color: #6732d2;
    color: white;
    // margin: 10px 20px;
    border-color: #6732d2;
}
</style>