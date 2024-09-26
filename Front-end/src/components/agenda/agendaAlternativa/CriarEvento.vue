<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn variant="elevated" class="text-none" icon="mdi-plus" text="Agendar" v-bind="activatorProps" color="rgba(58, 28, 118, 1)"></v-btn>
        </template>
        <v-form @submit.prevent="agendar">
            <v-card prepend-icon="mdi-calendar-plus" title="Novo Agendamento">
                <v-card-text class="overflow-auto pt-2">
                    <v-row dense>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="form.titulo" variant="outlined" clearable label="Título"
                                maxlength="30" :rules="rules.tituloRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea counter="600" auto-grow v-model="form.descricao" variant="outlined" label="Descrição" :rules="rules.descricaoRules"></v-textarea>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="form.candidato" :rules="candidatoRules" :items="items" label="Candidato" variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="form.vaga" label="Vaga" variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="editedItem.vaga" label="Vaga" variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="editedItem.data" label="Data" type="date" variant="outlined"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field v-model="editedItem.horario" label="Horário" type="time"
                            variant="outlined"></v-text-field>
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
                titulo: '',
                descricao: '',
                candidato:'',
                data: '2024-12-31',
                horario: '12:00',
                vaga:''
            },
            rules: {
                tituloRules: [
                (v) => !!v || "Título Requerido",
                (v) => v.length >= 3 || "Título deve ter pelo menos 3 caracteres",
                ],
                descricaoRules: [
                    (v) => !!v || "Descrição Requerida",
                    (v) => v.length <= 600 || "Máximo permitido 600 caracteres",
                ],
                candidatoRules: [
                (v) => !!v || "Candidato Requerido"
                ],
                items: [
                    'João',
                    'Maria',
                    'Felipe',
                    'Thiago',
                    'Rodrigo',
                    'Paula'
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