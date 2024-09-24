<template>
    <v-btn variant="text" icon="mdi-account-multiple-check" @click="dialog = true"></v-btn>

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
                                    <v-img :src="`https://randomuser.me/api/portraits/women/${item.foto}`"
                                        cover></v-img>
                                </v-card>
                            </template>

                            <template v-slot:item.nome="{ item }">
                                <router-link :to="`/perfil-candidato?id=${item.id}&requisicao=${requisicao}`" target="_blank" class="text-black">
                                    <v-btn variant="text" prepend-icon="mdi-arrow-top-right-thick"
                                        class="text-capitalize" title="Ver Curriculo">{{ item.nome }}</v-btn>
                                </router-link>
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
export default {
    data() {
        return {
            dialog: false,
            requisicao: '',
            search: '',
            headers: [
                { title: 'Foto', value: 'foto', sortable: false },
                { title: 'Nome', value: 'nome', sortable: false },
                { title: 'Profissão', value: 'profissao', sortable: false },
                { title: 'Relevância', value: 'relevancia', sortable: true },
                { title: 'Ação', value: 'acao', sortable: false },
            ],
            items: [
                {
                    foto: '1.jpg',
                    nome: 'João Pereira',
                    profissao: 'Engenheiro de Software',
                    relevancia: '70%',
                    acao: '',
                    id: 1,
                },
                {
                    foto: '2.jpg',
                    nome: 'Maria Fernandes',
                    profissao: 'Desenvolvedora Full Stack',
                    relevancia: '64%',
                    acao: '',
                    id: 2,
                },
                {
                    foto: '3.jpg',
                    nome: 'Carlos Silva',
                    profissao: 'Especialista em DevOps',
                    relevancia: '90%',
                    acao: '',
                    id: 3,
                },
            ],
        }
    },

    props: {
        Vagas: Object,
    },

    mounted(){
        this.requisicao = localStorage.getItem("grupo");
        this.requisicao = 'empresa';
    },

    methods: {
        aprovarCandidato(id) {
            alert(id);
        },

        removerCandidato(id) {
            alert(id);
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