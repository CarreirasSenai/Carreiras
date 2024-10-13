<template>
    <v-dialog v-model="dialog" max-width="700" persistent transition="dialog-center-transition">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn class="bg-deep-purple-accent-4" v-bind="activatorProps"
                @click="fase = 0, iniciarProcesso(1), defineProgress(3000), progress = false">
                Criar Vaga
            </v-btn>
        </template>

        <v-form class="text-start" @submit.prevent="submitCreate">
            <v-card>
                <v-card-title class="border overflow-auto">
                    <v-timeline :direction="resolucao.resolucaoDesktop ? 'horizontal' : 'vertical'" side="end">
                        <v-timeline-item :dot-color="fase >= 1 ? 'primary' : 'grey'"
                            :size="fase >= 1 ? 'small' : 'small'" fill-dot>
                            <template v-slot:opposite>
                                <div style="font-size: clamp(17px, 4vw, 20px);">Criar Vaga</div>
                            </template>
                        </v-timeline-item>
                        <v-timeline-item dot-color="grey" size="x-small" fill-dot>
                            <template v-slot:opposite>
                                <div style="font-size: clamp(17px, 4vw, 20px);">Criar Questionário</div>
                            </template>
                        </v-timeline-item>
                        <v-timeline-item dot-color="grey" size="x-small" fill-dot>
                            <template v-slot:opposite>
                                <div style="font-size: clamp(17px, 4vw, 20px);">Finalizar</div>
                            </template>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-title>
                <v-card-text v-if="progress" class="text-start overflow-auto" style="height: 70vh;">
                    <v-row dense>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="form.titulo" label="Nome do Vaga"
                                :rules="[rules.geral]"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="form.cep" label="CEP" prepend-inner-icon="mdi-map-marker"
                                :rules="[rules.geral]" maxlength="8"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="form.cidade" label="Cidade" :rules="[rules.geral]"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select v-model="form.estado" label="Estado" :items="listEstados"
                                :rules="[rules.geral]"></v-select>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-combobox v-model="form.contrato" label="Contrato" prepend-inner-icon="mdi-briefcase"
                                :items="['CLT', 'PJ', 'Temporário', 'Aprendiz', 'Estágio', 'Trainee']"
                                :rules="[rules.geral]"></v-combobox>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-combobox v-model="form.modalidade" label="Modalidade"
                                :items="['Presencial', 'Híbrido', 'Remoto']" :rules="[rules.geral]"></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-combobox v-model="form.nivel" label="Nível" prepend-inner-icon="mdi-ladder"
                                :items="['Aprendiz', 'Assistente', 'Auxiliar', 'Júnior', 'Pleno', 'Sênior', 'Líder', 'Coordenador', 'Gerente', 'Diretor']"
                                :rules="[rules.geral]"></v-combobox>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-combobox v-model="form.remuneracao" label="Remuneração"
                                prepend-inner-icon="mdi-currency-usd"></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12">
                            <v-combobox v-model="form.habsExigidas" chips closable-chips multiple
                                label="Habilidades Exigidas" hint="Escreva uma habilidade e tecle enter"
                                :rules="[rules.geral]"></v-combobox>
                        </v-col>
                        <v-col cols="12">
                            <v-combobox v-model="form.habsOpcionais" chips closable-chips multiple
                                label="Habilidades Opcionais" hint="Escreva uma habilidade e tecle enter"
                                :rules="[rules.geral]"></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12">
                            <v-textarea v-model="form.descricao" rows="10" auto-grow
                                label="Descrição (Visão Geral da Vaga)" :rules="[rules.geral]"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field v-model="form.qtdCandidatos" label="Máximo de Candidaturas" type="number"
                                :rules="[rules.geral]"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider v-if="progress"></v-divider>
                <v-card-actions v-if="progress">
                    <v-spacer></v-spacer>
                    <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn text="Salvar" variant="tonal" type="submit"></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>

    <v-dialog v-model="dialogQuestionario" max-width="700" persistent transition="dialog-center-transition">
        <v-card>
            <v-card-title class="border overflow-auto">
                <v-timeline :direction="resolucao.resolucaoDesktop ? 'horizontal' : 'vertical'" side="end">
                    <v-timeline-item :dot-color="fase >= 2 ? 'green' : 'primary'"
                        :size="fase >= 2 ? 'x-small' : 'small'" :icon="fase >= 2 ? 'mdi-check' : ''" fill-dot>
                        <template v-slot:opposite>
                            <div style="font-size: clamp(17px, 4vw, 20px);">Criar Vaga</div>
                        </template>
                    </v-timeline-item>
                    <v-timeline-item :dot-color="fase < 2 ? 'grey' : 'primary'" :size="fase < 2 ? 'x-small' : 'small'"
                        fill-dot>
                        <template v-slot:opposite>
                            <div style="font-size: clamp(17px, 4vw, 20px);">Criar Questionário</div>
                        </template>
                    </v-timeline-item>
                    <v-timeline-item dot-color="grey" size="x-small" fill-dot>
                        <template v-slot:opposite>
                            <div style="font-size: clamp(17px, 4vw, 20px);">Finalizar</div>
                        </template>
                    </v-timeline-item>
                </v-timeline>
            </v-card-title>
            <v-card-text class="text-start overflow-auto" style="height: 70vh;" v-if="progress">
                <v-row dense>
                    <v-col cols="10">
                        <small>
                            Saiba mais
                            <v-tooltip activator="parent" location="left">
                                O questionário consiste de no minímo 3 até 30 perguntas alternativas que farão
                                <br>
                                a triagem dos candidatos atribuindo um nível de relevância a cada um deles. <br>
                                Também é possivel adicionar perguntas discursivas que não terão relevância na
                                <br>
                                triagem.
                            </v-tooltip>
                        </small>
                        <h3>Questionário para triagem dos candidatos</h3>
                    </v-col>
                    <v-col cols="2" class="text-end mt-5">
                        <v-btn icon="mdi-plus" size="x-small" color="deep-purple-accent-4" title="Adicionar Pergunta"
                            @click="dialogPerguntas = true"></v-btn>
                    </v-col>
                    <v-col cols="12" v-if="questionario">
                        <div class="border pa-4 rounded mt-4" v-for="(questao, index) in questionario" :key="questao">
                            <h3 class="text-primary">{{ index + 1 }}) {{ questao.pergunta }}</h3>
                            <small>{{ questao.tipo }}</small>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider v-if="progress"></v-divider>
            <v-card-actions v-if="progress">
                <v-btn text="Finalizar" variant="tonal" @click="modalConfirmaQuestionario = true"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPerguntas" max-width="700" persistent>
        <v-form class="text-start" @submit.prevent="submitPergunta">
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
                            <small class="text-warning" v-if="count === 5">{{ mensagem = 'Limite atingido' }}</small>
                            <!-- <div id="alternativas" class="pa-4"></div> -->
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
                    <v-btn text="Fechar" variant="plain" @click="dialogPerguntas = false, resetAlternativas()"></v-btn>
                    <v-btn color="Enviar" text="Salvar" variant="tonal" type="submit"></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>

    <v-dialog max-width="500" v-model="modalConfirmaQuestionario">
        <v-card title="Leia com atenção!">
            <v-card-text>
                Certifique-se de que está tudo certo antes finalizar, você não poderá editar este questionário após
                confirmar.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Cancelar" @click="modalConfirmaQuestionario = false"></v-btn>
                <v-btn variant="tonal" text="Confirmar"
                    @click="modalConfirmaQuestionario = false, dialogQuestionario = false, questionario = ''"></v-btn>                
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useResolucaoDesktop } from '@/stores/resolucao';
import axios from 'axios';

export default {
    data: () => ({
        modalConfirmaQuestionario: false,
        progress: false,
        fase: 0,
        mensagem: '',
        novaAlternativa: '',
        vet: [],
        count: 0,
        dialogPerguntas: false,
        dialogQuestionario: false,
        dialog: false,
        form: {
            titulo: 'Analista de Dados',
            cep: '87775-435',
            cidade: 'Joinville',
            estado: 'SC',
            contrato: 'CLT',
            modalidade: 'Remoto',
            nivel: 'Júnior',
            remuneracao: '3.000,00',
            habsExigidas: ['Pacote Office', 'Lógica de Programação', 'Trabalho em Equipe'],
            habsOpcionais: ['Malabarismo', 'Conserto de Veículos', 'Plantar Bananeira'],
            descricao: 'A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.',
            qtdCandidatos: 100,
        },
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
        listEstados: ['Acre - AC', 'Alagoas - AL', 'Amapá - AP', 'Amazonas - AM', 'Bahia - BA',
            'Ceará - CE', 'Distrito Federal - DF', 'Espírito Santo - ES', 'Goiás - GO', 'Maranhão - MA',
            'Mato Grosso - MT', 'Mato Grosso do Sul - MS', 'Minas Gerais - MG', 'Pará - PA', 'Paraíba - PB',
            'Paraná - PR', 'Pernambuco - PE', 'Piauí - PI', 'Rio de Janeiro - RJ', 'Rio Grande do Norte - RN',
            'Rio Grande do Sul - RS', 'Rondônia - RO', 'Roraima - RR', 'Santa Catarina - SC', 'São Paulo - SP',
            'Sergipe - SE', 'Tocantins - TO'],
        infoQuestionario: `
        O questionário consiste de perguntas 
        alternativas que tem o objetivo de selecionar 
        e atribuir a relevância do candidato para a vaga 
        a fim de ajudar na triagem da seleção.`
    }),
    props: {
        MostrarVagas: {
            type: Function,
            required: true
        }
    },
    computed: {
        resolucao() {
            return useResolucaoDesktop();
        }
    },
    mounted() {
        this.resolucao.verificaResolucao();
    },
    methods: {
        async submitCreate(event) {
            // console.clear();
            const dados = await event;

            // alert(JSON.stringify(dados, null, 2))

            if (dados.valid === true) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vaga/create`, {
                        dados: this.form,
                    }, { withCredentials: true });

                    console.log(response.data);
                    this.perguntas.idVaga = response.data.idVaga;
                    this.MostrarVagas();
                    this.dialogQuestionario = true;
                    this.defineProgress(5000);
                    this.defineFase(2);
                    setTimeout(() => {
                        this.dialog = false;
                    }, 5000);

                } catch (error) {
                    console.error('Erro', error.response.data);
                }
            }
        },

        async submitPergunta(event) {
            // console.clear();
            const dados = await event;

            this.perguntas.respostas = this.vet;

            // alert(JSON.stringify(dados, null, 2))

            if (dados.valid === true) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/questionario/create`, {
                        dados: this.perguntas,
                    }, { withCredentials: true });

                    console.log(response.data);
                    this.readQuestionario();

                } catch (error) {
                    console.error('Erro', error.response.data);
                }
            }
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

        defineFase(value) {
            // console.clear();
            setTimeout(() => {
                this.fase = value;
                // console.log(this.fase);
                return this.fase;
            }, 2000);
        },

        defineProgress(value) {
            this.progress = false
            setTimeout(() => {
                this.progress = true
            }, value);
        },

        iniciarProcesso(value) {
            setTimeout(() => {
                this.fase = value;
                // console.log(this.fase);
                return this.fase;
            }, 1000);
        }
    }
}
</script>