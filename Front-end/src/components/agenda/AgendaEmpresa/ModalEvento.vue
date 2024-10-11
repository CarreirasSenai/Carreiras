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
                            <v-text-field v-model="editedItem.title" variant="outlined" clearable label="Título"
                                maxlength="30" :rules="rules.tituloRules"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea counter="600" auto-grow v-model="editedItem.descricao" variant="outlined"
                                label="Descrição" :rules="rules.descricaoRules"></v-textarea>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="editedItem.vaga" :items="vagas" item-title="titulo" item-value="id"
                                label="Selecione uma Vaga" persistent-hint return-object single-line variant="outlined" :clearable="true" @click="mostrarCandidatos">
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="editedItem.candidato" :items="candidatos" item-title="nome"
                                item-value="id" label="Selecione un Candidato" persistent-hint return-object single-line variant="outlined" :clearable="true">
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="editedItem.data" :rules="rules.dataRules" label="Data" type="date"
                                variant="outlined"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field v-model="editedItem.hora" label="Horário" type="time"
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
import axios from 'axios';

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
        vagas: [],
        candidatos: [],
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
            dataRules: [
                (v) => !!v || "Data Requerida",
                (v) => new Date(v) >= new Date() || "A data deve ser futura"
            ]
        },
        headers: [
            { title: 'Título', align: 'start', sortable: false, key: 'title' },
            { title: 'Candidato', align: 'start', sortable: false, key: 'candidato' },
            { title: 'Vaga', key: 'vaga' },
            { title: 'Data', key: 'data' },
            { title: 'Horário', key: 'hora' },
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
        'editedItem.vaga': function (newValue) {
            if (newValue && newValue.id) {
                this.mostrarCandidatos(newValue.id);
            }
        },
    },

    created() {
        this.initialize()
    },

    mounted() {
        this.mostrarVagas();
        this.mostrarCandidatos();
    },

    methods: {
        itemProps(vaga) {
            return {
                title: vaga.titulo,
                subtitle: vaga.id,
            };
        },
        candProps(candidato) {
            return {
                title: candidato.nome,
                subtitle: candidato.id,
            };
        },

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

        async mostrarCandidatos(vagaId) {
            this.loadingVagas = true;
            if (!vagaId) {
                vagaId = 0
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/agendamento/readCandidatos`, {
                    params: {
                        id: vagaId
                    },
                    withCredentials: true
                });

                this.candidatos = response.data.result
                console.log('construçao do this.candidatos:', this.candidatos);
            } catch (error) {
                console.error('Erro', error.response.data);
            }
        },

        async mostrarVagas() {
            this.loadingVagas = true;
            try {
                id_empresa = this.editedItem.id_empresa
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/read/empresa`, {
                    params: {
                        id: id_empresa,
                        requisicao: 'empresa'
                    },
                    withCredentials: true
                });

                this.vagas = response.data.result
                console.log('construçao do this.vagas:', this.vagas);
            } catch (error) {
                console.error('Erro', 'Erro ao mostrar vagas');
            }
        },

        editItem(item) {
            console.log("Editando item");
            this.editedIndex = this.eventos.indexOf(item);
            this.editedItem = Object.assign({}, item);
            if (this.editedItem.data) {
                this.editedItem.data = new Date(this.editedItem.data).toISOString().split('T')[0];
            }
            this.mostrarVagas();
            this.mostrarCandidatos();
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

        async save() {
            let vaga_id = 0;
            if (this.editedItem.vaga) {
                vaga_id = this.editedItem.vaga.id
            }
            let candidato_id = 0;
            if (this.editedItem.candidato) {
                candidato_id = this.editedItem.candidato.id
            }

            const newEvent = {
                id: this.editedItem.id,
                title: this.editedItem.title,
                descricao: this.editedItem.descricao,
                vaga: vaga_id,
                candidato: candidato_id,
                data: this.editedItem.data,
                hora: this.editedItem.hora
            };

            try {
                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/agendamento/update`, {
                    params: newEvent,
                }, { withCredentials: true });
                this.$emit('atualizarAgenda');
            } catch (error) {
                console.error('Erro ao atualizar a descrição:', error.response.data);
            }

            this.close();
        },
    },
}
</script>