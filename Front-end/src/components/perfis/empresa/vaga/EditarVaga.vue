<template>
    <div class="text-center div-button-edit">
        <v-dialog v-model="dialog" max-width="700" persistent>
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="bg-deep-purple-accent-4" v-bind="activatorProps">
                    Editar Vaga
                </v-btn>
            </template>

            <v-form class="ma-5 text-start" @submit.prevent="submitUpdate">
                <v-card title="Editar de Vaga">
                    <v-card-text class="text-start overflow-auto" style="height: 70vh;">
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="form.titulo" label="Nome do Vaga"
                                    :rules="[rules.geral]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="form.cep" label="CEP" v-mask="'#####-###'"
                                    prepend-inner-icon="mdi-map-marker" :rules="[rules.geral]"
                                    maxlength="9"></v-text-field>
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
                                <v-combobox v-model="form.questionario" chips closable-chips multiple
                                    label="Questionário" hint="Escreva uma pergunta e tecle enter"></v-combobox>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn text="Excluir" color="error" @click="modalDelete = true"></v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text="Fechar" variant="plain" @click="dialog = false"></v-btn>
                        <v-btn color="Enviar" text="Salvar" variant="tonal" type="submit"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>

    <v-dialog max-width="500" v-model="modalDelete">
        <v-card :title="'Deletar ' + this.form.titulo">
            <v-card-text>
                Ao excluir essa vaga todos os candidatos pendentes serão notificados com a justificativa para não
                contratação. Deseja continuar com a exclusão?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="tonal" text="Cancelar" @click="modalDelete = false"></v-btn>
                <v-btn variant="tonal" class="bg-error" text="Excluir" @click="deletarVaga"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        modalDelete: false,
        dialog: false,
        form: {
            id: '',
            titulo: '',
            cep: '',
            cidade: '',
            estado: '',
            contrato: '',
            modalidade: '',
            nivel: '',
            remuneracao: '',
            habsExigidas: [],
            habsOpcionais: [],
            descricao: '',
            etapas: [],
            questionario: []
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
    }),
    props: {
        MostrarVagas: {
            type: Function,
            required: true
        },
        Vagas: Object,
    },
    mounted() {
        this.form.id = this.Vagas.raw.id;
        this.form.titulo = this.Vagas.raw.titulo;
        this.form.cep = this.Vagas.raw.cep;
        this.form.cidade = this.Vagas.raw.cidade;
        this.form.estado = this.Vagas.raw.estado;
        this.form.contrato = this.Vagas.raw.contrato;
        this.form.modalidade = this.Vagas.raw.modalidade;
        this.form.nivel = this.Vagas.raw.nivel;
        this.form.remuneracao = this.Vagas.raw.remuneracao;

        // Remover os colchetes e as aspas da string e depois separar os valores por vírgula
        this.form.habsExigidas = this.Vagas.raw.habilidades_exigidas
            .replace(/[\[\]"]/g, '')
            .split(', ')
            .map(hab => hab.trim());

        this.form.habsOpcionais = this.Vagas.raw.habilidades_opcionais
            .replace(/[\[\]"]/g, '')
            .split(', ')
            .map(hab => hab.trim());

        this.form.descricao = this.Vagas.raw.descricao;

        this.form.etapas = this.Vagas.raw.etapas
            .replace(/[\[\]"]/g, '')
            .split(', ')
            .map(etapa => etapa.trim());

        this.form.questionario = this.Vagas.raw.questionario
            .replace(/[\[\]"]/g, '')
            .split(', ')
            .map(quest => quest.trim());
    },
    methods: {
        async submitUpdate(event) {
            console.clear();
            const dados = await event;

            // alert(JSON.stringify(dados, null, 2))

            if (dados.valid === true) {
                try {
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/vaga/update`, {
                        dados: this.form,
                    }, { withCredentials: true });

                    console.log(response.data);
                    this.MostrarVagas();
                    this.dialog = false;

                } catch (error) {
                    console.error('Erro', error.response.data);
                }
            }
        },

        async deletarVaga() {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/vaga/delete/${this.form.id}`, {
                    withCredentials: true,
                });

                console.log('Vaga Deletada!', response.data);
                this.dialog = false;
                this.modalDelete = false;
                this.MostrarVagas();
                window.location.reload;

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },
    }
}
</script>