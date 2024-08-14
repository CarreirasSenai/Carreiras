<template>
    <v-btn icon="mdi-menu" @click="dialog = !dialog" style="z-index: 1004;"></v-btn>
    <div v-if="dialog"
        class="position-fixed top-0 left-0 rounded-0 h-screen w-100 elevation bg-grey-darken-4 opacity-60"
        min-width="300">
    </div>
    <v-card v-if="dialog" class="position-fixed top-0 left-0 rounded-0 h-screen elevation bg-deep-purple-accent-3"
        min-width="300">
        <div class="d-flex align-center justify-space-between ma-3">
            <img src="/src/assets/Logo_branco.png" width="180">
            <v-btn icon="mdi-chevron-left" @click="dialog = !dialog"></v-btn>
        </div>
        <v-list nav class="bg-deep-purple-accent-3">
            <v-divider class="mb-4"></v-divider>
            <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-book-open" title="Sobre" value="sobre"></v-list-item>
            <v-list-item prepend-icon="mdi-phone" title="Contato" value="contato"></v-list-item>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-list-item prepend-icon="mdi-shield-account" title="Adm" value="adm"></v-list-item>
            <v-list-item prepend-icon="mdi-account-plus" title="Cadastro" value="cadastro"><a href="/login"></a></v-list-item>
            <v-list-item prepend-icon="mdi-login" title="Login" value="login"><a href="/cadastro-candidato"></a></v-list-item>
        </v-list>
    </v-card>
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

.v-card{
    animation: fadeInLeft 1s normal;
}
</style>