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
                            <v-card-title class="opacity-100 bg-deep-purple-accent-4 rounded-lg observavel">
                                {{ this.Vagas.titulo }}
                            </v-card-title>
                            <v-card-text style="max-height: 60vh;"
                                class="overflow-auto d-flex flex-column ga-2 pa-4 pl-6 pr-6">
                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Local:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.cidade }}, {{ this.Vagas.estado }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Contrato:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.contrato }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Modalidade:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.modalidade }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap" v-if="this.Vagas.remuneracao">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Senioridade:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.nivel }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap" v-if="this.Vagas.remuneracao">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Remuneração:</div>
                                    <div class="text-subtitle-1">{{ this.Vagas.remuneracao }}</div>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Habilidades Exigidas:
                                    </div>
                                    <v-chip v-for="(habilidade, index) in JSON.parse(this.Vagas.habilidades_exigidas)"
                                        :key="index">
                                        {{ habilidade }}
                                    </v-chip>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Habilidades Opcionais:
                                    </div>
                                    <v-chip v-for="(habilidade, index) in JSON.parse(this.Vagas.habilidades_opcionais)"
                                        :key="index">
                                        {{ habilidade }}
                                    </v-chip>
                                </div>

                                <div class="d-flex align-center ga-2 flex-wrap mt-2">
                                    <div class="text-deep-purple-accent-4 text-h6 w-100 border-b">Visão Geral da Vaga:
                                    </div>
                                    <div class="text-subtitle-1">
                                        {{ this.Vagas.descricao }}
                                    </div>
                                </div>

                            </v-card-text>
                            <span class="mdi mdi-close position-absolute top-0 right-0 mr-2"
                                @click="dialog = false"></span>
                            <v-card-actions class="d-flex justify-space-between">
                                <div class="d-flex flex-wrap ga-2">
                                    <v-btn class="bt-primario">Inscrever-se</v-btn>
                                    <v-btn class="bt-primario">Editar vaga</v-btn>
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
        Vagas: Object
    },
    mounted() {

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