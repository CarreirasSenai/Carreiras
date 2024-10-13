<template>
    <v-dialog v-model="dialog" fullscreen persistent>
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn class="bg-deep-purple-accent-4" :text="grupo === 'candidato' ? 'Inscrever-se' : 'Questionário'"
                v-bind="activatorProps"></v-btn>
        </template>

        <v-card>
            <v-toolbar>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                <div class="ml-1" style="font-size: clamp(17px, 4vw, 20px);">Questionario da Vaga</div>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn v-if="grupo === 'candidato'"
                        :text="resolucao.resolucaoDesktop ? 'Enviar Respostas' : 'Enviar'" variant="tonal" color="green"
                        @click="dialog = false"></v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text>
                <div v-for="(questao, i) in questionario" :key="questao" class="position-relative pt-10">
                    <v-radio-group :label="(i + 1) + ') ' + questao.pergunta" class=""
                        v-if="questao.tipo === 'alternativa'">
                        <v-radio v-for="(pergunta, index) in JSON.parse(questao.respostas)" :key="index"
                            :label="pergunta" :value="pergunta">
                        </v-radio>
                    </v-radio-group>
                    <div class="" v-else-if="questao.tipo === 'discursiva'">
                        <h4 class="text-grey-darken-1 mb-2 text-body-1"> {{ i + 1 }}) {{ questao.pergunta }}</h4>
                        <v-textarea variant="solo-filled" rows="2" auto-grow placeholder="Responda aqui..."
                            maxlength="2000"></v-textarea>
                    </div>
                    <EditarQuestionario />
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
        dialog: false,
        questionario: {},
        grupo: '',
    }),
    props: {
        IdVaga: {
            type: Number,
            required: true,
        }
    },
    computed: {
        resolucao() {
            return useResolucaoDesktop();
        }
    },
    mounted() {
        this.resolucao.verificaResolucao();
        this.grupo = localStorage.getItem('grupo');
        this.idVaga = this.IdVaga;
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