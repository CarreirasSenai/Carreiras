<template>
    <v-btn variant="text" icon="mdi-account-multiple-check" @click="dialog = true, readCandidaturas()"></v-btn>

    <v-dialog v-model="dialog" min-width="300px">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card flat>
                        <v-card-title class="d-flex flex-wrap align-center pe-4 ga-2">
                            <h1 style="font-size: 2.5vh; text-overflow: ellipsis; overflow: hidden;">
                                Candidatos a {{ this.Vagas.raw.titulo }}
                            </h1>
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" density="compact" label="Search"
                                prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details
                                single-line></v-text-field>
                        </v-card-title>

                        <v-divider></v-divider>
                        <v-data-table v-model:search="search" :items="items" :headers="headers" height="500"
                            class="position-relative">

                            <template v-slot:item.foto="{ item }">
                                <v-card class="my-2 rounded-circle" style="width:50px;">
                                    <v-img
                                        :src="item.foto ? `${caminhoFotos}/uploads/perfil/${item.foto}` : '/src/assets/avatar.png'"
                                        cover></v-img>
                                </v-card>
                            </template>

                            <template v-slot:item.nome="{ item }">
                                <router-link :to="`/perfil-candidato?requisicao=candidato&id=${item.id}`"
                                    target="_blank" class="text-black">
                                    <v-btn variant="text" prepend-icon="mdi-arrow-top-right-thick"
                                        class="text-capitalize" title="Ver Curriculo">{{ item.nome }}</v-btn>
                                </router-link>
                            </template>

                            <!-- <template v-slot:item.indicacao="{ item }">
                                <v-icon :icon="item.indicacao ? 'mdi-circle' : ''" color="deep-purple-accent-3"
                                    size="x-small"></v-icon>
                            </template> -->

                            <template v-slot:item.relevancia="{ item }">
                                <QuestionarioRespostas :Candidato="item" :Vaga="this.Vagas"
                                    :Relevancia="item.relevancia" />
                            </template>

                            <template v-slot:item.acao="{ item }">
                                <div class="d-flex">
                                    <v-btn icon="mdi-medal" size="x-small" class="bg-deep-orange-accent-3"
                                        @click="updateCandidatura(item.id, 2)"></v-btn>
                                    <v-btn icon="mdi-check-bold" size="x-small" class="mx-2 bg-success"
                                        @click="updateCandidatura(item.id, 1)"></v-btn>
                                    <ModalJustificativa :Candidato="item" :Vaga="this.Vagas"
                                        :ReadCandidaturas="readCandidaturas" />
                                </div>
                            </template>

                            <template v-slot:item.status="{ item }">
                                <v-chip v-if="item.status != null" :color="validaStatusCor(item.status)">
                                    <v-icon v-if="item.status === 2">mdi-medal</v-icon>
                                    {{ validaStatusTexto(item.status) }}
                                </v-chip>
                            </template>

                        </v-data-table>
                        <div class="d-flex position-absolute bottom-0 ma-2 ga-2">
                            <v-btn variant="tonal" @click="dialog = false">Fechar</v-btn>
                            <!-- <v-btn variant="tonal" class="elevation-0" @click="modalSelecao = true">Iniciar
                                Seleção</v-btn> -->
                            <ModalJustificativaGeral :Candidatos="items" :Vaga="this.Vagas" :MostrarVagas="this.MostrarVagas"/>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-dialog>

    <!-- <v-dialog max-width="500" v-model="modalSelecao">
        <v-card title="Qual status deseja atribuir ao candidato?">
            <v-card-actions>
                <v-btn text="Cancelar" @click="modalSelecao = false"></v-btn>
                <v-spacer></v-spacer>
                <v-btn variant="tonal" color="success" text="Selecionado" @click="updateCandidatura(1)"></v-btn>
                <v-btn variant="tonal" color="deep-orange-accent-3" text="Finalista"
                    @click="updateCandidatura(2)"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->

    <!-- <v-dialog max-width="500" v-model="modalFecharVaga">
        <v-card title="Confirme o término do processo seletivo">
            <v-card-text>
                Ao finalizar essa vaga, todos os candidatos a não ser o finalista, receberão uma justificativa para a não contratação!
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="tonal" text="Cancelar" @click="modalFecharVaga = false"></v-btn>
                <v-btn variant="tonal" class="bt-primario" text="Iniciar" @click="deleteVaga"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->
</template>

<script>
import axios from 'axios';
import ModalJustificativaGeral from './ModalJustificativaGeral.vue';

export default {
    data() {
        return {
            idVaga: '',
            idCandidato: '',
            status: '',
            dialog: false,
            dialogModal: false,
            modalSelecao: false,
            search: '',
            headers: [
                { title: 'Foto', value: 'foto', sortable: false },
                { title: 'Nome', value: 'nome', sortable: false },
                // { title: 'Indicação', value: 'indicacao', sortable: true },
                { title: 'Profissão', value: 'profissao', sortable: false },
                { title: 'Relevância', value: 'relevancia', sortable: true },
                { title: 'Status', value: 'status', sortable: true },
                { title: 'Ação', value: 'acao', sortable: false },
            ],
            items: [],
            candidaturas: [],
            candidatos: [],
            caminhoFotos: import.meta.env.VITE_BACKEND_URL,
        }
    },

    props: {
        Vagas: Object,
        MostrarVagas: Function
    },

    mounted() {
        this.idVaga = this.Vagas.raw.id;
    },

    methods: {
        async updateCandidatura(id, status) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/candidatura/update`, {
                    idVaga: this.idVaga,
                    idCandidato: id,
                    status: status,
                }, { withCredentials: true });

                console.log(response.data.result);
                this.readCandidaturas();

            } catch (error) {
                console.error('Erro ao Atualizar:', error.response.data);
            }
        },

        async readCandidaturas() {
            this.items = [];
            this.candidatos = [];
            this.candidaturas = [];

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/candidatura/read/vaga`, {
                    params: {
                        idVaga: this.idVaga,
                    },
                    withCredentials: true
                });

                console.log('Candidaturas: ', response.data.result);
                this.candidaturas = response.data.result;
                this.readCandidatos();

            } catch (error) {
                console.error('Erro ao obter dados do usuário', error.response.data);
            }
        },

        async readCandidatos() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/candidato/read/all`, {
                    withCredentials: true
                });

                console.log('Candidatos: ', response.data.usuarios);
                this.candidatos = response.data.usuarios;
                this.validarCandidaturas();

            } catch (error) {
                console.error('Erro ao obter candidatos', error.response.data);
            }
        },

        validarCandidaturas() {
            this.candidaturas.forEach(candidatura => {
                const candidato = this.candidatos.find(c => c.id === candidatura.id_candidato);
                if (candidato) {
                    if (candidatura.status != 0) {
                        this.items.push({
                            // ...candidato,                            
                            foto: candidato.foto,
                            nome: candidato.nome_completo,
                            profissao: candidato.profissao,
                            relevancia: candidatura.relevancia,
                            id: candidato.id,
                            status: candidatura.status,
                            email: candidato.email
                        });
                    }
                }
            });
            console.log(this.items);
        },

        validaStatusTexto(value) {
            if (value === 1) {
                return 'Selecionado';
            } else if (value === 2) {
                return 'Finalista';
            }
        },

        validaStatusCor(value) {
            if (value === 1) {
                return 'success';
            } else if (value === 2) {
                return 'deep-orange-accent-3';
            }
        }

        // async iniciarSelecao() {
        //     try {
        //         const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}//`, {                    
        //             idVaga: this.idVaga
        //         }, { withCredentials: true });

        //         console.log(response.data);

        //     } catch (error) {
        //         console.error('Erro', error.response.data.error);
        //     }
        // }
    }
}
</script>

<style scoped>
* {
    /* border: 1px solid red; */
}

.v-data-table {
    height: 65vh;
}
</style>