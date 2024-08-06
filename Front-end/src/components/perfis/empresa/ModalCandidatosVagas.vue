<template>
    <v-btn variant="text" icon="mdi-account-multiple-check" @click="dialog = true"></v-btn>

    <v-dialog v-model="dialog" min-width="300px" max-width="800px">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>Inscritos em: Analista de Dados<v-tooltip activator="parent" location="top">Candidatos Inscritos na Vaga</v-tooltip></v-card-title>
                        <v-card-text style="max-height: 60vh;" class="overflow-auto d-flex flex-column ga-1">
                            <h1>Espaço reservado</h1>
                        </v-card-text>
                        <v-card-actions class="d-flex justify-space-between">
                            <v-btn class="bt-primario" @click="dialog = false">Fechar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-dialog>
</template>

<script>

export default {
    data() {
        return {
            dialog: false,
        }
    },
}
</script>

<style scoped>
* {
    /* border: 1px solid red; */
}
</style>