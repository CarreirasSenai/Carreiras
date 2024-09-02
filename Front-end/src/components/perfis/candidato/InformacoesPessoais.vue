<template>
    <v-card>
        <v-card-title class="cor-primaria">Informações Pessoais</v-card-title>
        <v-card-text class="d-flex">
            <v-container>
                <v-row>
                    <v-col cols="6" md="6" class="infos-pessoais">
                        <p>{{ nome }}&nbsp;{{ sobrenome }}<v-tooltip activator="parent" location="right">{{ nome }}&nbsp;{{ sobrenome }}</v-tooltip></p>
                        <p>{{ telefone }}<v-tooltip activator="parent" location="right">{{ telefone }}</v-tooltip></p>
                        <p>{{ celular }}<v-tooltip activator="parent" location="right">{{ celular }}</v-tooltip></p>
                    </v-col>
                    <v-col cols="6" md="6" class="infos-pessoais">
                        <p>{{ email }}<v-tooltip activator="parent" location="right">{{ email }}</v-tooltip></p>
                        <p>{{ cidade }} - {{ estado }}</p>
                        <p>CEP: {{ cep }}</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        nome: 'Yudi',
        sobrenome: 'Tamashiro',
        email: 'japayudi@gmail.com',
        telefone: '4002-8922',
        celular: '(47) 9 4002-8922',
        cpf: '340.345.234-90',
        senha: 'asd978fh93uf0asdf03r8asf',
        cep: '78.876-876',
        rua: 'Rua da Compania',
        numero: '40',
        complemento: 'Casa',
        bairro: 'Liberdade',
        cidade: 'São Paulo',
        estado: 'SP',
    }),
}
</script>

<style scoped>
p {
    margin: 5.8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

p title {
    color: red;
}
</style>