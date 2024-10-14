<template>
    <v-btn class="bg-deep-purple-accent-4" :text="grupo === 'empresa' ? 'Questionário' : 'Inscrever-se'"
        @click="user.dadosUser ? dialog = true : showSnackbar = true"></v-btn>

    <v-dialog v-model="dialog" fullscreen persistent>
        <v-card>
            <v-card-title class="pa-0">
                <v-toolbar class="ma-0">
                    <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                    <div class="ml-1" style="font-size: clamp(17px, 4vw, 20px);">Questionario da Vaga</div>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn v-if="grupo === 'candidato'"
                            :text="resolucao.resolucaoDesktop ? 'Enviar Respostas' : 'Enviar'" variant="tonal"
                            color="green" @click="dialog = false"></v-btn>
                    </v-toolbar-items>
                </v-toolbar>
            </v-card-title>

            <v-card-text class="overflow-auto">
                <!-- <v-card variant="tonal" class="mb-6" color="deep-purple-accent-4" title="Atenção" prepend-icon="mdi-alert">
                    <v-card-item>
                        Você poderá editar este questionário até o momento em que a vaga for aprovada.
                    </v-card-item>
                </v-card> -->

                <div v-for="(questao, i) in questionario" :key="questao" class="position-relative pt-10">
                    <v-radio-group v-if="questao.tipo === 'alternativa'">
                        <h4 class="text-grey-darken-1 mb-2 text-body-1"> {{ i + 1 }}) {{ questao.pergunta }}</h4>
                        <v-radio v-for="(pergunta, index) in JSON.parse(questao.respostas)" :key="index"
                            :label="pergunta" :value="pergunta">
                        </v-radio>
                    </v-radio-group>
                    <div v-else-if="questao.tipo === 'discursiva'">
                        <h4 class="text-grey-darken-1 mb-2 text-body-1"> {{ i + 1 }}) {{ questao.pergunta }}</h4>
                        <v-textarea variant="outlined" rows="2" auto-grow placeholder="Responda aqui..."
                            maxlength="2000"></v-textarea>
                    </div>
                    <EditarQuestionario v-if="idEmpresa === user.dadosUser.id && grupo === 'empresa'"
                        :ReadQuestionario="readQuestionario" :Pergunta="questao" />
                </div>
            </v-card-text>
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
        showSnackbar: false,
        idVaga: '',
        idEmpresa: '',
        dialog: false,
        questionario: {},
        grupo: '',
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
        }
    },
    mounted() {
        this.resolucao.verificaResolucao();
        this.grupo = localStorage.getItem('grupo');
        this.idVaga = this.Vagas.raw.id;
        this.idEmpresa = this.Vagas.raw.id_empresa;
        this.readQuestionario();
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
    }
}
</script>