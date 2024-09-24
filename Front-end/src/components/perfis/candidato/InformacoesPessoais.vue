<template>
    <v-card>
        <v-card-title class="cor-primaria" title="teste">Informações Pessoais</v-card-title>
        <v-card-text class="d-flex">
            <v-container>
                <v-row no-gutters>
                    <v-col cols="6" md="2" class="infos-pessoais">
                        <p>Nome:</p>
                        <p>E-mail:</p>
                        <p>Celular:</p>
                    </v-col>
                    <v-col cols="6" md="4" class="infos-valores">
                        <p>{{ nome }}<v-tooltip activator="parent" location="right">{{ nome
                                }}</v-tooltip></p>
                        <p>{{ email }}<v-tooltip activator="parent" location="right">{{ email }}</v-tooltip></p>
                        <p>{{ celular }}<v-tooltip activator="parent" location="right">{{ celular }}</v-tooltip></p>
                    </v-col>
                    <v-col cols="6" md="2" class="infos-pessoais">
                        <p>Telefone:<v-tooltip activator="parent" location="right">Telefone</v-tooltip></p>
                        <p>Cidade:</p>
                        <p>Estado:</p>
                    </v-col>
                    <v-col cols="6" md="3" class="infos-valores">
                        <p>{{ telefone }}<v-tooltip activator="parent" location="right">{{ telefone }}</v-tooltip></p>
                        <p>{{ cidade }}<v-tooltip activator="parent" location="right">{{ cidade }}</v-tooltip></p>
                        <p>{{ estado }}<v-tooltip activator="parent" location="right">{{ estado }}</v-tooltip></p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';

export default {
    data: () => ({
        nome: '',
        email: '',
        telefone: '',
        celular: '',
        cidade: '',
        estado: '',
    }),

    mounted(){
        this.nome = this.user.dadosUser.nome_completo;
        this.email = this.user.dadosUser.email;
        this.telefone = this.user.dadosUser.telefone;
        this.celular = this.user.dadosUser.celular;
        this.cidade = this.user.dadosUser.cidade;
        this.estado = this.user.dadosUser.estado;
    },

    computed: {
        user() { return useCandidatoStore(); },
    },

}
</script>

<style scoped>
* {
    /* border: 1px solid red; */
}

p {
    margin: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

p title {
    color: red;
}

/* .infos-pessoais p {
    color: #6732d2;
} */
</style>