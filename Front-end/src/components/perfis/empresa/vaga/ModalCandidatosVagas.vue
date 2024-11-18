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
                                    <v-btn icon="mdi-check-bold" size="x-small" class="mx-2 bg-success"
                                        @click="aprovarCandidato(item.id)"></v-btn>
                                    <ModalJustificativa :Candidato="item" :Vaga="this.Vagas" />
                                </div>
                            </template>

                        </v-data-table>
                        <v-btn class="bt-primario position-absolute bottom-0 ma-2 elevation-0"
                            @click="dialog = false">Fechar</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            idVaga: '',
            dialog: false,
            dialogModal: false,
            search: '',
            headers: [
                { title: 'Foto', value: 'foto', sortable: false },
                { title: 'Nome', value: 'nome', sortable: false },
                // { title: 'Indicação', value: 'indicacao', sortable: true },
                { title: 'Profissão', value: 'profissao', sortable: false },
                { title: 'Relevância', value: 'relevancia', sortable: true },
                { title: 'Ação', value: 'acao', sortable: false },
            ],
            items: [],
            candidaturas: [],
            candidatos: [],
            caminhoFotos: import.meta.env.VITE_BACKEND_URL,

            // items: [
            //     {
            //         foto: '1.jpg',
            //         nome: 'João Pereira',
            //         indicacao: 'true',
            //         profissao: 'Engenheiro de Software',
            //         relevancia: '70',
            //         acao: '',
            //         id: 25,
            //     }
            // ],
        }
    },

    props: {
        Vagas: Object,
    },

    mounted() {
        this.idVaga = this.Vagas.raw.id;
    },

    methods: {
        aprovarCandidato(id) {
            alert(id);
        },

        removerCandidato(id) {
            alert(id);
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
                    this.items.push({
                        // ...candidato,                            
                        foto: candidato.foto,
                        nome: candidato.nome_completo,
                        profissao: candidato.profissao,
                        relevancia: candidatura.relevancia,
                        id: candidato.id,
                    });
                }
            });
            console.log(this.items);
        },
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