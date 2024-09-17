<template>
    <v-btn variant="text" icon="mdi-account-multiple-check" @click="dialog = true"></v-btn>

    <v-dialog v-model="dialog" min-width="300px">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card flat>
                        <v-card-title class="d-flex flex-wrap align-center pe-4 ga-2">
                            <h1 style="font-size: 2.5vh; text-overflow: ellipsis; overflow: hidden;">
                                Candidatos de Analista de Dados
                            </h1>

                            <v-spacer></v-spacer>

                            <v-text-field v-model="search" density="compact" label="Search"
                                prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details
                                single-line></v-text-field>
                        </v-card-title>

                        <v-divider></v-divider>
                        <v-data-table v-model:search="search" :items="items" height="500" class="position-relative">
                            <template v-slot:item.foto="{ item }">
                                <v-card class="my-2 rounded-circle w-75">
                                    <v-img :src="`https://randomuser.me/api/portraits/women/${item.foto}`"
                                        cover></v-img>
                                </v-card>
                            </template>

                            <template v-slot:item.nome="{ item }">
                                <v-btn variant="text" prepend-icon="mdi-arrow-top-right-thick" class="text-capitalize"
                                    @click="redirectPerfil(perfil)">{{ item.nome }}</v-btn>
                            </template>

                            <template v-slot:item.habilidades="{ item }">
                                <v-sheet class="py-4 px-1" style="max-width: 300px;">
                                    <v-chip-group selected-class="text-primary" mandatory>
                                        <v-chip variant="outlined" v-for="(habilidade, index) in item.habilidades"
                                            :key="index">{{ habilidade }}</v-chip>
                                    </v-chip-group>
                                </v-sheet>
                            </template>

                            <template v-slot:item.stock="{ item }">
                                <div class="text-end">
                                    <v-chip :color="item.stock ? 'green' : 'red'"
                                        :text="item.stock ? 'In stock' : 'Out of stock'" class="text-uppercase"
                                        size="small" label></v-chip>
                                </div>
                            </template>
                        </v-data-table>
                        <v-btn class="bt-primario position-absolute bottom-0 ma-2"
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
            perfil: '/perfil-candidato',
            search: '',
            items: [
                {
                    foto: '1.jpg',
                    nome: 'João Pereira',
                    profissão: 'Engenheiro de Software',
                    habilidades: ['javascript', 'typescript', 'node.js', 'express', 'angular', 'docker', 'kubernetes'],
                },
                {
                    foto: '2.jpg',
                    nome: 'Maria Fernandes',
                    profissão: 'Desenvolvedora Full Stack',
                    habilidades: ['php', 'laravel', 'mysql', 'vue', 'nuxt', 'tailwind', 'git'],
                },
                {
                    foto: '3.jpg',
                    nome: 'Carlos Silva',
                    profissão: 'Especialista em DevOps',
                    habilidades: ['bash', 'aws', 'terraform', 'ansible', 'jenkins', 'k8s', 'grafana'],
                },
            ],
        }
    },
    methods: {
        redirectPerfil(perfil) {
            const url = this.$router.resolve(perfil).href;
            window.open(url, '_blank');
        }
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