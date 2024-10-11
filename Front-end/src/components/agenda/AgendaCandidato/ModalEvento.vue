<template>
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
                :sort-by="[{ key: 'vaga', order: 'asc' }]">

                <template v-slot:item.candidato="{ item }">
                    {{ item.candidato }}
                </template>

                <template v-slot:item.vaga="{ item }">
                    {{ item.vaga }}
                </template>

                <template v-slot:item.titulo="{ item }">
                    {{ item.title }}
                </template>

                <template v-slot:item.data="{ item }">
                    {{ new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }}
                </template>


                <template v-slot:item.horario="{ item }">
                    {{ item.hora }}
                </template>

            </v-data-table>

            <v-btn variant="flat" class="position-absolute left-0 ma-2 bottom-0"
                @click="$emit('FecharTabela')">Fechar</v-btn>
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
            type: String,
            required: true
        }
    },

    data: () => ({
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
            { title: 'Título', align: 'start', sortable: false, key: 'title' },
            { title: 'Candidato', align: 'start', sortable: false, key: 'candidato' },
            { title: 'Vaga', key: 'vaga' },
            { title: 'Data', key: 'data' },
            { title: 'Horário', key: 'hora' },
            { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
        ]
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
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            const eventData = this.eventos[this.editedIndex];
            if (eventData && eventData.data) {
                this.editedItem.data = new Date(eventData.data).toISOString().split('T')[0];
            }
        },

        formatDate(isoString) {
            const date = new Date(isoString);
            return date.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
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
    },
}
</script>