<template>
    <v-dialog v-model="dialog" max-width="700" persistent>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon="mdi-pencil" size="x-small" class="border position-absolute top-0" v-bind="activatorProps">
            </v-btn>
        </template>

        <v-form class="text-start" @submit.prevent="updatePergunta">
            <v-card title="Criar Pergunta">
                <v-card-text class="text-start overflow-auto" style="height: 70vh;">
                    <v-row dense>
                        <v-col cols="12">
                            <v-textarea v-model="perguntas.pergunta" rows="2" auto-grow label="Descreva a pergunta"
                                maxlength="2000" :rules="[rules.geral]"></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-radio-group v-model="perguntas.tipo" inline label="Tipo da pergunta"
                                :rules="[rules.geral]">
                                <v-radio label="Alternativa" value="alternativa"
                                    @click="perguntas.tipo = 'alternativa'"></v-radio>
                                <v-radio label="Discursiva" value="discursiva"
                                    @click="perguntas.tipo = 'discursiva', resetAlternativas()"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" v-if="perguntas.tipo === 'alternativa'">
                            Defina todas as alternativas para a questão:
                            <v-text-field class="mt-2" v-model="novaAlternativa" id="alternativa" density="compact"
                                variant="outlined" clearable></v-text-field>
                            <v-btn variant="tonal" class="mr-2 bg-deep-purple-accent-4" @click="createAlternativa"
                                :disabled="count === 5">adicionar</v-btn>
                            <v-btn class="mr-4" variant="tonal" @click="resetAlternativas">Resetar</v-btn>
                            <small class="text-warning" v-if="count === 5">Limite atingido</small>
                            <v-radio-group v-model="perguntas.respCorreta" class="pa-4" :rules="[rules.alternativas]">
                                <v-radio v-for="(alt, index) in vet" :key="index"
                                    :label="`${index + 1}) ${alt} ${perguntas.respCorreta === alt ? '- Resposta correta' : ''}`"
                                    :value="alt" color="green">
                                </v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" v-else-if="perguntas.tipo === 'discursiva'">
                            Será disponibilizado um campo de entrada para que o candidato possa responder a pergunta.
                            <br><br>
                            <em>Questões discursivas não atribuem relevância ao candidato.</em>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn text="Fechar" variant="plain" @click="dialog = false, resetAlternativas()"></v-btn>
                    <v-btn color="Enviar" text="Salvar" variant="tonal" type="submit"></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
import { useResolucaoDesktop } from '@/stores/resolucao';
import axios from 'axios';

export default {
    data: () => ({
        novaAlternativa: '',
        vet: [],
        count: 0,
        dialog: false,
        perguntas: {
            tipo: '',
            pergunta: '',
            respostas: [],
            respCorreta: '',
            idVaga: '',
        },
        questionario: {},

        rules: {
            geral: value => !!value || 'O campo obrigatório.',
            alternativas: value => !!value || 'Adicione as alternativas e marque a correta.'
        },
    }),

    computed: {
        resolucao() {
            return useResolucaoDesktop();
        }
    },

    mounted() {
        this.resolucao.verificaResolucao();
    },

    methods: {

        async updatePergunta(event) {
            // console.clear();
            const dados = await event;

            this.perguntas.respostas = this.vet;

            // alert(JSON.stringify(dados, null, 2))

            // if (dados.valid === true) {
            //     try {
            //         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/questionario/create`, {
            //             dados: this.perguntas,
            //         }, { withCredentials: true });

            //         console.log(response.data);
            //         this.readQuestionario();

            //     } catch (error) {
            //         console.error('Erro', error.response.data);
            //     }
            // }
        },

        async readQuestionario() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/questionario/read`, {
                    params: {
                        id: this.perguntas.idVaga,
                    },
                    withCredentials: true
                });

                console.log(response.data);
                this.questionario = response.data.result;

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },

        createAlternativa() {
            const input = this.novaAlternativa.trim();

            if (input !== '') {
                if (this.count <= 5) {
                    if (!this.vet.includes(input)) {
                        this.vet.push(input);
                        this.count += 1;
                        this.novaAlternativa = '';
                    } else {
                        alert('Alternativa já existente!');
                    }
                } else {
                    alert('Número máximo de alternativas atingido!');
                }
            }
        },

        resetAlternativas() {
            this.vet = []; // Limpa o array de alternativas
            this.count = 0; // Reseta o contador
            this.novaAlternativa = ''; // Limpa o campo de entrada
            this.perguntas.respCorreta = null; // Reseta a seleção
        },
    }
}
</script>