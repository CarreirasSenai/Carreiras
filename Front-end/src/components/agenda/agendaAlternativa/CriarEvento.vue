<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn variant="elevated" class="text-none" icon="mdi-plus" text="Agendar" v-bind="activatorProps" color="#567494"></v-btn>
        </template>
        <v-form @submit.prevent="agendar">
            <v-card prepend-icon="mdi-calendar-plus" title="Novo Agendamento">
                <v-card-text class="overflow-auto pt-2">
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.nome" variant="outlined" clearable label="Nome e Sobrenome"
                                maxlength="30" :rules="rules.nomeRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.celular" variant="outlined" label="Celular" maxlength="14"
                                :rules="rules.celularRules"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete v-model="form.servicos" :rules="rules.servicoRules" clearable chips
                                label="Serviços" :items="['Corte Social', 'Barba', 'Escovação', 'Mãos', 'Pés']" multiple
                                variant="outlined" maxlength="30"></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="6">
                            <input type="date" v-model="form.data" class="pa-3 rounded w-100">
                        </v-col>
                        <v-col cols="12" md="6">
                            <input type="time" v-model="form.horario" class="pa-3 rounded w-100">
                        </v-col>
                        <v-col cols="12" class="mt-4">
                            <span>Tempo estimado: <span class="bg-primary pa-1 rounded-lg">1:40 min.</span></span>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Salvar" variant="tonal" type="submit"></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            form: {
                nome: '',
                celular: '',
                servicos: [],
                data: '2024-12-31',
                horario: '12:00',
            },
            rules: {
                nomeRules: [
                    v => !!v || 'Nome requerido.',
                    v => (/^[A-Z][a-z]+ [A-Z][a-z]+( [A-Z][a-z]+)?$/.test(v)) || 'Iniciais Maiúsculas.'
                    ],
                celularRules: [
                    v => !!v || 'Celular requerido, apenas números.',
                    v => (/[(][0-9]{2}[)][ ][0-9]{5}[-][0-9]{4}/.test(v)) || 'Celular incorreto.'
                ],
                servicoRules: [
                    v => (/([a-zA-Z]{1,})|([a-zA-Z]{1,}[ ][a-zA-Z]{1,})/.test(v)) || 'Selecione pelo menos 1 serviço.'
                ]
            },
        };
    },

    methods: {
        mascaraCelular(valor) {
            var mascarado = valor.replace(/\D/g, '');

            mascarado = mascarado.replace(/^(\d{2})$/, '($1) ');
            mascarado = mascarado.replace(/^(\d{2})(\d{5})$/, '($1) $2-');
            mascarado = mascarado.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

            return mascarado;
        },

        async agendar(event) {
            const results = await event
            // alert(JSON.stringify(results, null, 2))

            if (results.valid === true) {
                console.clear();
                console.log(this.form);
                console.log(this.form.servicos);
                this.dialog = false;
            }
        },
    },

    watch: {
        'form.celular': function (valor) {
            this.form.celular = this.mascaraCelular(valor);
        },
    }
}
</script>

<style scoped>
input {
    border: 1px solid rgb(182, 182, 182);
}
</style>