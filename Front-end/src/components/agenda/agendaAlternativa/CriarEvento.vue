<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn variant="elevated" class="text-none" icon="mdi-plus" text="Agendar" v-bind="activatorProps"
                color="rgba(58, 28, 118, 1)"></v-btn>
        </template>
        <v-form @submit.prevent="agendar">
            <v-card prepend-icon="mdi-calendar-plus" title="Novo Agendamento">
                <v-card-text class="overflow-auto pt-2">
                    <v-row dense>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="form.titulo" variant="outlined" clearable label="Título"
                                maxlength="30" :rules="rules.tituloRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea counter="600" auto-grow v-model="form.descricao" variant="outlined"
                                label="Descrição" :rules="rules.descricaoRules"></v-textarea>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="form.vaga" :items="vagas" item-title="titulo" item-value="id"
                                label="Selecione uma Vaga" persistent-hint return-object single-line variant="outlined"
                                :clearable="true" @focus="mostrarVagas" @update:modelValue="onVagaSelecionada">
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="form.candidato" :items="candidatos" item-title="nome" item-value="id"
                                label="Selecione um Candidato" persistent-hint return-object single-line
                                variant="outlined" :clearable="true">
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.data" label="Data" type="date"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.horario" label="Horário" type="time"
                                variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Salvar" variant="tonal" type="submit"></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-snackbar v-model="snackbar.visible" :color="snackbar.type" :timeout="snackbar.timeout">
            {{ snackbar.message }}
        </v-snackbar>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        showModal: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            snackbar: {
                visible: false,
                message: '',
                type: '',
                timeout: 3000
            },
            vagas: [],
            candidatos: [],
            dialog: false,
            form: {
                titulo: '',
                descricao: '',
                candidato: '',
                data: '2024-12-31',
                horario: '12:00',
                vaga: ''
            },
            rules: {
                tituloRules: [
                    (v) => !!v || "Título Requerido",
                    (v) => v.length >= 3 || "Título deve ter pelo menos 3 caracteres",
                ],
                descricaoRules: [
                    (v) => !!v || "Descrição Requerida",
                    (v) => v.length <= 600 || "Máximo permitido 600 caracteres",
                ],
                candidatoRules: [
                    (v) => !!v || "Candidato Requerido"
                ],
            },
        };
    },
    mounted() {
        this.mostrarVagas();
        this.mostrarCandidatos();
    },
    methods: {
        itemProps(vaga) {
            return {
                title: vaga.titulo,
                subtitle: vaga.id,
            };
        },
        candProps(candidato) {
            return {
                title: candidato.nome,
                subtitle: candidato.id,
            };
        },
        async mostrarCandidatos(vagaId) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/agendamento/readCandidatos`, {
                    params: { id: vagaId || 0 },
                    withCredentials: true
                });
                this.candidatos = response.data.result || [];
            } catch (error) {
                console.error('Erro', error.response.data);
                this.showSnackbar('Erro ao carregar candidatos.', 'error');
            }
        },
        async mostrarVagas() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/read/empresa`, {
                    params: { id: 18, requisicao: 'empresa' },
                    withCredentials: true
                });
                this.vagas = response.data.result || [];
            } catch (error) {
                console.error('Erro ao Buscar Vagas', error);
                this.showSnackbar('Erro ao carregar vagas.', 'error');
            }
        },
        onVagaSelecionada(vagaSelecionada) {
            if (vagaSelecionada && vagaSelecionada.id) {
                this.form.candidato = '';
                this.mostrarCandidatos(vagaSelecionada.id);
            } else {
                this.mostrarCandidatos();
            }
        },
        async agendar() {
            try {
                const dadosAgendamento = {
                    titulo: this.form.titulo,
                    descricao: this.form.descricao,
                    vaga: this.form.vaga.id || 0,
                    candidato: this.form.candidato.id,
                    empresa: 18,
                    data: this.form.data,
                    horario: this.form.horario
                };
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/agendamento/create`, {
                    params: dadosAgendamento,
                }, { withCredentials: true });


                if (response.data.success) {
                    this.dialog = false;
                    this.resetForm();
                    this.$emit('agendamento-salvo');
                } else {
                    this.showSnackbar('Erro ao salvar agendamento: ' + response.data.message, 'error');
                }
            } catch (error) {
                console.error('Erro ao salvar agendamento:', error.response ? error.response.data : error.message);
                this.showSnackbar('Erro ao salvar agendamento.', 'error');
            }
        },
        showSnackbar(message, type) {
            this.snackbar.message = message;
            this.snackbar.type = type;
            this.snackbar.visible = true;
            setTimeout(() => {
                this.snackbar.visible = false;
            }, this.snackbar.timeout);
        },
        resetForm() {
            this.form.titulo = '';
            this.form.descricao = '';
            this.form.candidato = '';
            this.form.data = '2024-12-31';
            this.form.horario = '12:00';
            this.form.vaga = '';
        }
    },
    computed: {
        internalShowModal() {
            return this.showModal;
        },
    },
    watch: {
        dialog(newVal) {
            if (!newVal) {
                this.resetForm();
            }
        },
        'form.vaga': function (newValue) {
            if (newValue && newValue.id) {
                this.mostrarCandidatos(newValue.id);
            } else {
                this.mostrarCandidatos();
            }
        },
    },
}
</script>

<style scoped>
input {
    border: 1px solid rgb(182, 182, 182);
}
</style>I