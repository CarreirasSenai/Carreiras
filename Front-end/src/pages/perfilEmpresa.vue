<template>
    <Navbar />
    <FotoCapaEmpresa />
    <v-row class="ma-4 mb-1 d-flex align-center row-rev">
        <v-col cols="12" sm="6">
            <h1>Vagas da Empresa</h1>
        </v-col>
        <v-col cols="12" sm="6" class="text-end">
            <v-btn class="bt-primario">Nova Vaga</v-btn>
        </v-col>
    </v-row>
    <v-divider class="ml-7 mr-7"></v-divider>
    <VagasPerfilEmpresa />
</template>

<style></style>