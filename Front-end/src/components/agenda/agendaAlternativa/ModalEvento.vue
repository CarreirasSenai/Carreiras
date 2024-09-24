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
                :sort-by="[{ key: 'servico', order: 'asc' }]">

                <template v-slot:item.servico="{ item }">
                    {{ item.servico.join(', ') }}
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
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field v-model="editedItem.cliente" label="Dessert name"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field v-model="editedItem.servico" label="Calories"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                            <v-text-field v-model="editedItem.horario" label="Fat (g)"></v-text-field>
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
            <v-card-title class="text-h5">Excluir Evento?</v-card-title>
            <v-card-text>Descrição do Evento</v-card-text>
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
        headers: [
            { title: 'Cliente', align: 'start', sortable: false, key: 'cliente', },
            { title: 'Serviços', key: 'servico' },
            { title: 'Data', key: 'data' },
            { title: 'Horários', key: 'horario' },
            { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            cliente: '',
            servico: 0,
            data: 0,
            horario: 0,
        },
        defaultItem: {
            cliente: '',
            servico: 0,
            data: 0,
            horario: 0,
        },
    }),

    emits: ['FecharTabela'],

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
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
            this.desserts = [
                {
                    cliente: 'Frozen Yogurt',
                    servico: 159,
                    horario: 6.0,
                },
                {
                    cliente: 'Frozen Yogurt',
                    servico: 159,
                    horario: 6.0,
                },
                {
                    cliente: 'Frozen Yogurt',
                    servico: 159,
                    horario: 6.0,
                },
                {
                    cliente: 'Thjiago Lima',
                    servico: 159,
                    horario: 6.0,
                },
            ]
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
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
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>