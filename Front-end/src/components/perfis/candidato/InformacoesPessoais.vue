<template>
    <v-card>
        <v-card-title class="cor-primaria" title="teste">Informações Pessoais</v-card-title>
        <v-card-text class="d-flex text-card">
            <v-container>
                <v-row no-gutters>
                    <v-col cols="6" md="2" class="infos-pessoais">
                        <p>Nome:</p>
                        <p>E-mail:</p>
                        <p>Celular:</p>
                    </v-col>
                    <v-col cols="6" md="4" class="infos-valores">
                        <p>{{ Dados.nome_completo }}<v-tooltip activator="parent" location="right">{{ Dados.nome_completo }}</v-tooltip></p>
                        <p>{{ Dados.email }}<v-tooltip activator="parent" location="right">{{ Dados.email }}</v-tooltip></p>
                        <p>{{ Dados.celular }}<v-tooltip activator="parent" location="right">{{ Dados.celular }}</v-tooltip></p>
                    </v-col>
                    <v-col cols="6" md="2" class="infos-pessoais">
                        <p>Telefone:</p>
                        <p>Cidade:</p>
                        <p>Estado:</p>
                    </v-col>
                    <v-col cols="6" md="3" class="infos-valores">
                        <p>{{ Dados.telefone }}<v-tooltip activator="parent" location="right">{{ Dados.telefone }}</v-tooltip></p>
                        <p>{{ Dados.cidade }}<v-tooltip activator="parent" location="right">{{ Dados.cidade }}</v-tooltip></p>
                        <p>{{ Dados.estado }}<v-tooltip activator="parent" location="right">{{ Dados.estado }}</v-tooltip></p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
    }),
    props: {
        Dados: {
            type: Object,
            required: true
        },
    },
}
</script>

<style scoped>
p {
    margin: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

p title {
    color: red;
}

.text-card {
    height: 150px;
    min-height: 140px;
}

@media (max-width: 959px) {
    .text-card {
        height: 200px;
    }
}

/* .infos-pessoais p {
    color: #6732d2;
} */
</style>