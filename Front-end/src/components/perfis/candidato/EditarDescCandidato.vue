<template>
    <div class="text-center div-button-edit">
        <v-dialog v-model="dialog">
            <template v-slot:activator="{ props: activatorProps }">
                <!-- <v-btn class="text-none font-weight-regular bt-edit" variant="tonal"
                    v-bind="activatorProps">Editar</v-btn> -->
                <button class="text-none font-weight-regular mdi mdi-pencil bt-edit" variant="tonal"
                    v-bind="activatorProps"></button>
            </template>

            <v-card prepend-icon="mdi-account" title="Editar Descrição">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="12">
                            <v-textarea label="Descrição" required></v-textarea>
                        </v-col>
                    </v-row>

                    <!-- <small class="text-caption text-medium-emphasis">*Indica os campos obrigatórios</small> -->
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
                    <v-btn text="Salvar" color="Enviar" variant="tonal" @click="dialog = false" class="bg-purple-darken-4"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style lang="scss" scoped>
.div-button-edit {
    display: flex;
    justify-content: end;
    position: absolute;
    bottom: 0;
    right: 0;
}

.bt-edit {
    // background-color: #6732d2;
    // color: white;
    text-transform: uppercase;
    margin: 10px 20px;
}

.mdi {
    color: #6732d2af;
}

.mdi:hover {
    color: #6732d2;
}
</style>

<script>
export default {
    data: () => ({
        dialog: false,
    }),
}
</script>