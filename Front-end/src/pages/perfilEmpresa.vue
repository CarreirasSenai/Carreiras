<template>
    <Navbar />
    <FotoCapaEmpresa />
    <!-- <v-row class="ma-4 mb-1 d-flex flex-row align-center">            
        <v-col cols="12" sm="6">
            <h1 style="font-size: 3vh;">Vagas da Empresa</h1>
        </v-col>
        <v-col cols="12" sm="6" class="text-end">
            <v-btn class="bt-primario">Adicionar</v-btn>
        </v-col>
    </v-row> -->
    <div class="ma-7 mb-4 d-flex justify-space-between align-center">
        <h1 style="font-size: 4vh;">Minhas Vagas</h1>
        <v-btn class="bt-primario">+ Nova</v-btn>
    </div>
    <v-divider class="ml-7 mr-7"></v-divider>
    <VagasPerfilEmpresa />
</template>

<style></style>