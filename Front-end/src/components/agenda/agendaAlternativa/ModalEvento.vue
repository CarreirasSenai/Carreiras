<template>
    <!-- Table -->
    <v-dialog v-model="internalShowModal">
        <v-card>
            <v-card-title class="d-flex align-center pe-2 text-primary">
                Eventos do dia {{ title }}

                <v-spacer></v-spacer>

                <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                    variant="outlined" flat hide-details single-line></v-text-field>
            </v-card-title>

            <v-divider></v-divider>
            <v-data-table height="400" v-model:search="search" :headers="headers" :items="eventos"
                :sort-by="[{ key: 'titulo', order: 'asc' }]">

                <template v-slot:item.titulo="{ item }">
                    {{ item.titulo }}
                </template>

                <template v-slot:item.candidato="{ item }">
                    {{ item.candidato }}
                </template>

                <template v-slot:item.vaga="{ item }">
                    {{ item.vaga }}
                </template>

                <template v-slot:item.data="{ item }">
                    {{ item.data }}
                </template>

                <template v-slot:item.horario="{ item }">
                    {{ item.horario }}
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-icon color="grey" class="me-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon color="grey" @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>

            <v-btn variant="flat" class="position-absolute left-0 ma-2 bottom-0"
                @click="$emit('FecharTabela')">Fechar</v-btn>
        </v-card>
    </v-dialog>

    <!-- Modal Edit -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Editar evento</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="editedItem.titulo" variant="outlined" clearable label="Título"
                                maxlength="30" :rules="rules.tituloRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea counter="600" auto-grow v-model="editedItem.descricao" variant="outlined"
                                label="Descrição" :rules="rules.descricaoRules"></v-textarea>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="editedItem.candidato" :rules="candidatoRules" :items="items"
                                label="Candidato" variant="outlined"></v-select>
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
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Modal Delete -->
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Excluir Evento</v-card-title>
            <v-card-text>Essa ação é irreversível. Deseja excluir evento?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="plain" @click="closeDelete">Cancelar</v-btn>
                <v-btn color="error" variant="tonal" @click="deleteItemConfirm">Excluir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
</template>

<script>
export default {
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        eventos: {
            type: Array,
            required: true
        },
        title: {
            type: Number
        }
    },

    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
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
        headers: [
            { title: 'Título', align: 'start', sortable: false, key: 'titulo' },
            { title: 'Candidato', align: 'start', sortable: false, key: 'candidato' },
            { title: 'Vaga', key: 'vaga' },
            { title: 'Data', key: 'data' },
            { title: 'Horários', key: 'horario' },
            { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
        ],
        editedIndex: -1,
        editedItem: {
            titulo: '',
            descricao: '',
            candidato: '',
            vaga: '',
            data: '',
            horario: '',
        },
        defaultItem: {
            titulo: '',
            descricao: '',
            candidato: '',
            vaga: '',
            data: '',
            horario: '',
        },
    }),

    emits: ['FecharTabela'],

    computed: {
        internalShowModal() {
            return this.showModal;
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
        },
        editItem(item) {
            console.log("Editando item:", item);
            this.editedIndex = this.eventos.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            console.log("Excluindo item:", item);
            this.editedIndex = this.eventos.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.eventos.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.eventos[this.editedIndex], this.editedItem)
            } else {
                this.eventos.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>
