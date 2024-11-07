<template>
    <div class="text-center">
        <v-btn variant="tonal" class="bg-deep-purple-accent-3" @click="dialog = true, getUserEmpresa()">
            Detalhes
        </v-btn>

        <v-dialog v-model="dialog" min-width="300px" max-width="1000px">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-chip size="small" variant="outlined" class="mb-1 bg-deep-purple-accent-2" v-model="snackbar">
                            Copiado para área de transferência!
                        </v-chip>
                        <v-card class="rounded-lg">
                            <v-card-title
                                class="pa-2 opacity-100 bg-deep-purple-accent-4 observavel d-flex align-center">
                                <v-btn size="x-small" class="mr-2 position-relative" icon="mdi-share-variant"
                                    variant="tonal" @click="compartilhar">
                                </v-btn>
                                <div style="font-size: clamp(10px, 4vw, 20px);">{{ this.Vagas.raw.titulo }}</div>
                                <v-spacer></v-spacer>
                                <v-btn size="x-small" icon="mdi-close" variant="tonal" @click="dialog = false"></v-btn>
                            </v-card-title>
                            <v-card-text style="max-height: 60vh;"
                                class="overflow-auto d-flex flex-column ga-2 pa-4 pl-6 pr-6">
                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Local:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.raw.cidade }}, {{ this.Vagas.raw.estado
                                        }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Contrato:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.raw.contrato }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Modalidade:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.raw.modalidade }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap" v-if="this.Vagas.raw.remuneracao">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Senioridade:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.raw.nivel }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap" v-if="this.Vagas.raw.remuneracao">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Remuneração:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.raw.remuneracao }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Habilidades Exigidas:
                                    </div>
                                    <v-chip size="small"
                                        v-for="(habilidade, index) in JSON.parse(this.Vagas.raw.habilidades_exigidas)"
                                        :key="index">
                                        {{ habilidade }}
                                    </v-chip>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Habilidades Opcionais:
                                    </div>
                                    <v-chip size="small"
                                        v-for="(habilidade, index) in JSON.parse(this.Vagas.raw.habilidades_opcionais)"
                                        :key="index">
                                        {{ habilidade }}
                                    </v-chip>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap mt-2">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Visão Geral da Vaga:
                                    </div>
                                    <div class="text-subtitle-1">
                                        {{ this.Vagas.raw.descricao }}
                                    </div>
                                </div>

                            </v-card-text>

                            <v-card-actions class="d-flex justify-space-between border">
                                <div class="d-flex flex-wrap ga-2">
                                    <EditarVaga v-if="user.dadosUser.id === this.Vagas.raw.id_empresa"
                                        :MostrarVagas="MostrarVagas" :Vagas="Vagas" />
                                    <Questionario :Vagas="Vagas" />
                                    <v-btn v-if="user.dadosUser.grupo === 'admin'" 
                                    variant="outlined" 
                                    color="deep-purple-accent-3"
                                    @click="dialogFormAprovacao = true">
                                        Aprovação
                                    </v-btn>
                                </div>
                                <router-link :to="`/perfil-empresa?requisicao=empresa&id=${this.Vagas.raw.id_empresa}`"
                                    class="text-black text-decoration-none">
                                    <div class="d-flex align-center justify-center ga-2">
                                        {{ empresa.nome_fantasia }}
                                        <img :src="empresa.foto" width="50px" class="rounded-circle">
                                    </div>
                                </router-link>
                            </v-card-actions>
                            <div>
                                <v-form ref="formAprovacao" v-model="isFormValid">
                                    <v-dialog
                                    v-model="dialogFormAprovacao"
                                    max-width="600"
                                    >
                                        <v-card
                                            prepend-icon="mdi-briefcase"
                                            title="Aprovação da vaga"
                                        >
                                        <v-card-text>
                                            <v-col cols="12">
                                                <v-radio-group
                                                    v-model="opcaoSelecionada"
                                                    :rules="[v => !!v || 'Selecione uma opção']"
                                                >
                                                    <v-radio label="Aprovar" value="aprovar"></v-radio>
                                                    <v-radio label="Reprovar" value="reprovar"></v-radio>
                                                </v-radio-group>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-textarea
                                                    v-if="opcaoSelecionada === 'reprovar'"
                                                    label="Motivo da Reprovação"
                                                    v-model="motivoReprovacao"
                                                    :rules="[motivoReprovacaoRules.obrigatorioRules, motivoReprovacaoRules.tamanhoRules]"
                                                    counter
                                                    no-resize
                                                ></v-textarea>
                                            </v-col>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text="Fechar"
                                                    variant="plain"
                                                    @click="dialogFormAprovacao = false"
                                                ></v-btn>
                                                <v-btn
                                                    color="deep-purple-accent-3"
                                                    text="Salvar"
                                                    variant="tonal"
                                                    @click="aprovarVaga"
                                                    :disabled="!isFormValid"
                                                ></v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-form>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-dialog>
        <v-snackbar :color="color" v-model="snackbarUpdate" :timeout="6000">
            <div class="text-center">{{ mensagem }}</div>
        </v-snackbar>
    </div>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import { usePesquisaUsuarioStore } from '@/stores/pesquisaUsuario';
import axios from 'axios';

export default {
    data() {
        return {
            grupo: '',
            dialog: false,
            snackbar: false,
            empresa: '',
            snackbarUpdate: false,
            mensagem: '',
            color: '',
            dialogFormAprovacao: false,
            opcaoSelecionada: null,
            motivoReprovacao: '',
            emailEmpresa: '',
            motivoReprovacaoRules: {
                obrigatorioRules: v => !!v || 'Por favor, insira o motivo da reprovação',
                tamanhoRules: v => v.length <= 200 && v.length >= 50 || 'O motivo deve ter no mínimo 50 caracteres e no máximo 200 caracteres'},
            isFormValid: false
        }
    },
    props: {
        Vagas: Object,
        MostrarVagas: {
            type: Function,
            required: true
        }
    },
    computed: {
        user() {
            return useCandidatoStore();
        },
        pesquisaUser() {
            return usePesquisaUsuarioStore();
        }
    },
    mounted() {
        this.grupo = localStorage.getItem('grupo');
    },
    methods: {
        compartilhar() {
            const url = `${import.meta.env.VITE_FRONTEND_URL}/detalhes-vaga?id=${this.Vagas.raw.id}&titulo=${encodeURIComponent(this.Vagas.raw.titulo)}`;
            // Utiliza a API de Clipboard para copiar o URL
            navigator.clipboard.writeText(url)
                .then(() => {
                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erro ao copiar o URL para a área de transferência: ', err);
                });
        },

        async getUserEmpresa() {
            const id = this.Vagas.raw.id_empresa;

            console.log(id)

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/empresa/read`, {
                    params: {
                        id: this.Vagas.raw.id_empresa,
                    },
                    withCredentials: true
                });

                this.empresa = response.data.usuario;

                const path = `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/`;
                const avatarPadrao = '/src/assets/avatar.png';
                const capaPadrao = '/src/assets/capa (1).png';

                const foto = this.empresa.foto;
                const capa = this.empresa.capa;

                this.empresa.foto = foto ? path + foto : avatarPadrao;
                this.empresa.capa = capa ? path + capa : capaPadrao;

                this.emailEmpresa = this.empresa.email;

                // console.log(this.empresa);                

            } catch (error) {
                console.error('Erro ao obter dados do usuário', error.response.data);
            }
        },
        async aprovarVaga() {
            try {
                if(this.isFormValid && this.$refs.formAprovacao.validate()) {
                    this.getUserEmpresa();
                    const companyEmail = this.emailEmpresa;

                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/vaga/update/status`, {
                        id_vaga: this.Vagas.raw.id,
                        id_empresa: this.Vagas.raw.id_empresa,
                        opcaoSelecionada: this.opcaoSelecionada,
                        mensagem: this.motivoReprovacao,
                        titulo: this.Vagas.raw.titulo,
                        email: companyEmail
                    },
                        {
                            withCredentials: true
                        })
    
                    this.mensagem = "A operação foi realizada com sucesso.";
                    this.snackbarUpdate = true;
                    this.color = 'success';
                    this.dialog = false;
                    setTimeout(() => {
                        this.snackbarUpdate = false;
                        this.MostrarVagas();
                    }, 1500);
                }
            } catch (error) {
                this.snackbarUpdate = true;
                this.color = 'error';
                this.mensagem = "Houve um erro ao realizar operação desejada.";
                setTimeout(() => {
                    this.snackbarUpdate = false;
                }, 3500)
                console.error(error);
            }
        }
    }
}
</script>

<style scoped>
.mdi-close {
    color: white;
}

.mdi-close:hover {
    color: white;
}
</style>