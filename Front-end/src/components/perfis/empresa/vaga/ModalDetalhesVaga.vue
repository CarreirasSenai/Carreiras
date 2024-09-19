<template>
    <div class="text-center">
        <v-btn variant="tonal" class="bg-deep-purple-accent-3" @click="dialog = true">
            Detalhes
        </v-btn>

        <v-dialog v-model="dialog" min-width="300px" max-width="1000px">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card class="rounded-lg">
                            <v-card-title class="opacity-100 bg-deep-purple-accent-4 observavel d-flex align-center">
                                <v-btn size="small" class="mr-2" icon="mdi-share-variant" variant="tonal"
                                    @click="compartilhar"></v-btn>
                                {{ this.Vagas.raw.titulo }}
                                <v-spacer></v-spacer>
                                <v-btn size="small" icon="mdi-close" variant="tonal" @click="dialog = false"></v-btn>
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

                            <v-card-actions class="d-flex justify-space-between">
                                <div class="d-flex flex-wrap ga-2">
                                    <v-btn class="bt-primario">Inscrever-se</v-btn>
                                    <EditarVaga :MostrarVagas="MostrarVagas" :Vagas="Vagas" />
                                    <small>O button alterna conforme o user logado.</small>
                                </div>
                                <div class="d-flex align-center justify-center ga-2">
                                    TOTVS
                                    <img src="/src/assets/avatar.png" width="50px">
                                </div>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
    props: {
        Vagas: Object,
        MostrarVagas: {
            type: Function,
            required: true
        }
    },
    methods: {
        compartilhar() {
            const url = `${import.meta.env.VITE_FRONTEND_URL}/detalhes-vaga?id=${this.Vagas.raw.id}&titulo=${encodeURIComponent(this.Vagas.raw.titulo)}`;

            // Utiliza a API de Clipboard para copiar o URL
            navigator.clipboard.writeText(url)
                .then(() => {
                    console.log('URL copiado para a área de transferência!');
                    // Adicione uma notificação para o usuário ou alguma outra ação
                })
                .catch(err => {
                    console.error('Erro ao copiar o URL para a área de transferência: ', err);
                });
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