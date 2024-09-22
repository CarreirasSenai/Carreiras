<template>
    <div class="text-center div-button-edit">
        <v-dialog v-model="dialog" max-width="700" persistent>
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="bg-deep-purple-accent-4" v-bind="activatorProps">
                    Criar Vaga
                </v-btn>
            </template>

            <v-form class="ma-5 text-start" @submit.prevent="submitCreate">
                <v-card title="Publicação de Vaga">
                    <v-card-text class="text-start overflow-auto" style="height: 70vh;">
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
                                <v-text-field v-model="form.cidade" label="Cidade"
                                    :rules="[rules.geral]"></v-text-field>
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
                                <v-combobox v-model="form.etapas" chips closable-chips multiple label="Etapas da Vaga"
                                    hint="Escreva uma etapa e tecle enter" :rules="[rules.geral]"></v-combobox>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="12">
                                <v-icon icon="mdi-information" size="x-small" color="grey-lighten-1" :title="infoQuestionario">
                                    <v-tooltip activator="parent" location="end"></v-tooltip>
                                </v-icon>
                                <v-combobox v-model="form.questionario" chips closable-chips multiple
                                    label="Questionário de Triagem"
                                    hint="Escreva uma pergunta e tecle enter"></v-combobox>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field v-model="form.qtdCandidatos" label="Máximo de Candidaturas" type="number"
                                    :rules="[rules.geral]"></v-text-field>
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
            etapas: ['Entrevista', 'Desafio', 'Call com Líder', 'Acordo'],
            questionario: ['Há quantos anos você usa Excel no trabalho?', 'Fale sobre um projeto desafiador.'],
            qtdCandidatos: 100,
        },
        rules: {
            geral: value => !!value || 'O campo obrigatório.'
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
    methods: {
        async submitCreate(event) {
            console.clear();
            const dados = await event;

            // alert(JSON.stringify(dados, null, 2))

            if (dados.valid === true) {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vaga/create`, {
                        dados: this.form,
                    }, { withCredentials: true });

                    console.log(response.data);
                    this.MostrarVagas();
                    this.dialog = false;

                } catch (error) {
                    console.error('Erro', error.response.data);
                }
            }
        }
    }
}
</script>