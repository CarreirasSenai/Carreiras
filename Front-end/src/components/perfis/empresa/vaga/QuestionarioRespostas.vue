<template>
    <v-sheet class="text-center rounded-lg pa-1 elevation-1 cursor-pointer" style="width: 50px;"
        @click="dialogModal = true, readQuestionario()" :color="validaCorRelevancia(Relevancia)">{{ Relevancia
        }}%</v-sheet>

    <v-dialog v-model="dialogModal" fullscreen persistent>
        <v-card>
            <v-card-title class="pa-0">
                <v-toolbar class="ma-0">
                    <v-btn icon="mdi-close" @click="dialogModal = false"></v-btn>
                    <v-spacer></v-spacer>
                    <v-card class="ml-3 my-2 rounded-circle border" style="width:45px;">
                        <v-img
                            :src="candidato.foto ? `${caminhoFotos}/uploads/perfil/${candidato.foto}` : '/src/assets/avatar.png'"
                            cover></v-img>
                    </v-card>
                    <div class="ml-2" style="font-size: clamp(17px, 4vw, 20px);">{{ candidato.nome }}</div>                    
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-sheet class="text-center rounded-lg pa-1 ma-3 elevation-1" style="width: 60px;"
                            :color="validaCorRelevancia(Relevancia)">{{ Relevancia }}%</v-sheet>
                    </v-toolbar-items>
                </v-toolbar>
            </v-card-title>

            <v-card-text class="mt-4">
                <div v-for="(questao, i) in questionario" :key="questao.id" class="position-relative pt-10">
                    <!-- Para perguntas de múltipla escolha -->
                    <v-radio-group disabled v-model="form[questao.id]" v-if="questao.tipo === 'alternativa'">
                        <h4 class="text-grey-darken-1 mb-2 text-body-1">
                            {{ i + 1 }}) {{ questao.pergunta }}
                        </h4>
                        <v-radio v-for="(pergunta, index) in JSON.parse(questao.respostas)" :key="index"
                            :label="pergunta" :value="pergunta">
                        </v-radio>
                        <!-- Exibir resposta correta -->
                        <div v-if="questao.respCorreta" class="mt-2 text-success">
                            <strong>Resposta correta:</strong> {{ questao.respCorreta }}
                        </div>
                    </v-radio-group>

                    <!-- Para perguntas discursivas -->
                    <div v-else-if="questao.tipo === 'discursiva'">
                        <h4 class="text-grey-darken-1 mb-2 text-body-1">
                            {{ i + 1 }}) {{ questao.pergunta }}
                        </h4>
                        <v-textarea disabled v-model="form[questao.id]" variant="outlined" rows="2" auto-grow
                            placeholder="Responda aqui..." maxlength="2000" counter>
                        </v-textarea>
                        <!-- Exibir resposta correta (se existir) -->
                        <div v-if="questao.respCorreta" class="mt-2 text-success">
                            <strong>Resposta correta:</strong> {{ questao.respCorreta }}
                        </div>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { useResolucaoDesktop } from '@/stores/resolucao';
import axios from 'axios';

export default {
    data: () => ({
        idVaga: '',
        idEmpresa: '',
        questionario: {},
        grupo: '',
        form: {},
        candidato: '',
        dialogModal: false,
        caminhoFotos: import.meta.env.VITE_BACKEND_URL,
    }),
    props: {
        Vaga: Object,
        Candidato: Object,
        Relevancia: Number
    },
    computed: {
        resolucao() {
            return useResolucaoDesktop();
        },
    },
    mounted() {
        this.resolucao.verificaResolucao();
        this.grupo = localStorage.getItem('grupo');
        this.idVaga = this.Vaga.raw.id;
        this.idEmpresa = this.Vaga.raw.id_empresa;
        this.candidato = this.Candidato;
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
                this.readQuestionarioResposta();

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },

        // populaForm() {
        //     console.log(this.questionario);

        //     for (const key in this.questionario) {
        //         this.form['questionarioId' + this.questionario[key].id] = '';
        //     }
        //     console.log(this.form);
        // },

        validaCorRelevancia(value) {
            if (value < 50) {
                return 'error';
            }
            if (value >= 50 && value < 70) {
                return 'warning';
            }
            if (value >= 70 && value < 90) {
                return 'info';
            }
            if (value >= 90) {
                return 'success';
            }
        },

        async readQuestionarioResposta() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/questionario/read/resposta`, {
                    params: {
                        idVaga: this.idVaga,
                        idCandidato: this.candidato.id,
                    },
                    withCredentials: true
                });

                // Mapeia as respostas para o formato esperado
                const respostas = response.data.result.reduce((acc, curr) => {
                    acc[curr.id_questionario] = curr.resposta;
                    return acc;
                }, {});

                // Inicializa o form com as respostas existentes ou valores vazios
                this.form = this.questionario.reduce((acc, questao) => {
                    acc[questao.id] = respostas[questao.id] || '';
                    return acc;
                }, {});

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },
    },
}
</script>