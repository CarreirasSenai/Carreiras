<template>
    <v-btn variant="flat" :color="nomeBtn === 'Inscrito' ? 'success' : 'deep-purple-accent-4'"
        @click="handleButtonClick" :loading="loading">{{ nomeBtn }}</v-btn>

    <v-dialog v-model="dialog" fullscreen persistent>
        <v-card>
            <v-form @submit.prevent="validaFormEnvio">
                <v-card-title class="pa-0">
                    <v-toolbar class="ma-0">
                        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                        <div class="ml-1" style="font-size: clamp(17px, 4vw, 20px);">Questionario da Vaga</div>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn v-if="grupo === 'candidato'"
                                :text="resolucao.resolucaoDesktop ? 'Enviar Respostas' : 'Enviar'" variant="tonal"
                                color="green" type="submit"></v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>

                <v-card-text class="mt-4">
                    <v-card variant="tonal" class="mb-4" color="deep-purple-accent-4" title="Atenção"
                        v-if="idEmpresa === user.dadosUser.id && grupo === 'empresa'" prepend-icon="mdi-alert">
                        <v-card-item>
                            Você poderá editar este questionário até o momento em que a vaga for aprovada.
                        </v-card-item>
                    </v-card>
                    <AdicionarQuestionario v-if="idEmpresa === user.dadosUser.id && grupo === 'empresa'"
                        :ReadQuestionario="readQuestionario" :IdVaga="idVaga" />
                    <div v-for="(questao, i) in questionario" :key="questao" class="position-relative pt-10">
                        <v-radio-group v-model="form['questionarioId' + questao.id]" :rules="[rules.geral]"
                            v-if="questao.tipo === 'alternativa'">
                            <h4 class="text-grey-darken-1 mb-2 text-body-1"> {{ i + 1 }}) {{ questao.pergunta }}</h4>
                            <v-radio v-for="(pergunta, index) in JSON.parse(questao.respostas)" :key="index"
                                :label="pergunta" :value="pergunta">
                            </v-radio>
                        </v-radio-group>
                        <div v-else-if="questao.tipo === 'discursiva'">
                            <h4 class="text-grey-darken-1 mb-2 text-body-1"> {{ i + 1 }}) {{ questao.pergunta }}</h4>
                            <v-textarea v-model="form['questionarioId' + questao.id]" :rules="[rules.geral]"
                                variant="outlined" rows="2" auto-grow placeholder="Responda aqui..." maxlength="2000"
                                counter></v-textarea>
                        </div>
                        <EditarQuestionario v-if="idEmpresa === user.dadosUser.id && grupo === 'empresa'"
                            :ReadQuestionario="readQuestionario" :Pergunta="questao" />
                    </div>
                </v-card-text>
            </v-form>
        </v-card>
    </v-dialog>

    <v-snackbar location="center" v-model="showSnackbar" :timeout="4000" color="white" elevation="24">
        <div class="text-center pa-5 ma-5 text-h6">
            Faça login primeiro
        </div>
        <v-spacer></v-spacer>
        <v-btn class="bg-deep-purple-accent-4" to="/empresa-candidato?resposta=entrar" block>
            Entrar
        </v-btn>
    </v-snackbar>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import { useResolucaoDesktop } from '@/stores/resolucao';
import axios from 'axios';

export default {
    data: () => ({
        nomeBtn: 'Inscrever-se',
        loading: false,
        showSnackbar: false,
        idVaga: '',
        idEmpresa: '',
        dialog: false,
        questionario: {},
        grupo: '',
        form: {},

        rules: {
            geral: value => !!value || 'Rersponda a questão.'
        },
    }),
    props: {
        Vagas: Object,
    },
    computed: {
        resolucao() {
            return useResolucaoDesktop();
        },
        user() {
            return useCandidatoStore();
        },
    },
    mounted() {
        this.resolucao.verificaResolucao();
        this.grupo = localStorage.getItem('grupo');
        this.idVaga = this.Vagas.raw.id;
        this.idEmpresa = this.Vagas.raw.id_empresa;
        this.readQuestionario();
        this.readCandidatura();
    },
    methods: {
        async readQuestionario() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/questionario/read`, {
                    params: {
                        id: this.idVaga,
                    },
                    withCredentials: true
                });

                console.log(response.data);
                this.questionario = response.data.result;

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },

        handleButtonClick() {
            if (this.user.dadosUser && this.nomeBtn != 'Inscrito') {
                this.dialog = true;
                this.populaForm();
                if (!this.questionario.length && this.grupo === 'candidato') {
                    this.enviarCandidatura();
                }
            } else if (!this.user.dadosUser) {
                this.showSnackbar = true;
            }
        },

        populaForm() {
            console.log(this.questionario);

            for (const key in this.questionario) {
                this.form['questionarioId' + this.questionario[key].id] = '';
            }
            console.log(this.form);
        },

        async validaFormEnvio(event) {
            const dados = await event;

            if (dados.valid === true) {
                this.enviarCandidatura();
            }
        },

        async enviarCandidatura() {
            this.loading = true;
            console.log(this.form);
            this.dialog = false;

            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/candidatura/create`, {
                    dados: this.form,
                    idVaga: this.idVaga
                }, { withCredentials: true });

                console.log(response.data);

                setTimeout(() => {
                    this.readCandidatura();
                }, 3000);

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },

        async readCandidatura() {
            console.log(this.idVaga);

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/candidatura/read`, {
                    params: {
                        idVaga: this.idVaga
                    },
                    withCredentials: true
                });

                console.log(response.data);
                const candidatura = response.data.result;

                if (candidatura.id_vaga === this.idVaga) {
                    this.nomeBtn = 'Inscrito';
                }

                this.loading = false;

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },

        nomeBotao() {
            if (this.grupo === 'empresa') {
                this.nomeBtn = 'Questionário';
            } else if (this.grupo === 'candidato') {
                this.nomeBtn = 'Inscrever-se';
            } else {
                this.nomeBtn = 'Inscrever-se';
            }
        },
    },

    watch: {
        grupo(newVal) {
            this.nomeBotao(); // Atualiza o valor de nomeBtn quando o grupo mudar
        }
    }
}
</script>