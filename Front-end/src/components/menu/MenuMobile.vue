<template>
    <div>
        <ProgressLoader ref="showProgress" />
        <div>
            <v-btn icon="mdi-menu" @click="dialog = !dialog"></v-btn>
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
                    <v-divider class="ma-4 mt-0 border-opacity-100 "></v-divider>
                    <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/"></v-list-item>
                    <v-list-item prepend-icon="mdi-book-open" title="Sobre o Carreiras" value="sobre" to="/sobre"></v-list-item>
                    <v-list-item prepend-icon="mdi-phone" title="Contate-nos" value="contato"></v-list-item>
                    <v-divider class="ma-4 border-opacity-100"></v-divider>
                    <v-list-item prepend-icon="mdi-shield-account" title="Adm" value="adm" to="/login?resposta=admin"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-plus" title="Cadastro" value="cadastro" to="/empresa-candidato?resposta=cadastro"></v-list-item>
                    <v-list-item prepend-icon="mdi-login" title="Login" value="login" to="/empresa-candidato?resposta=entrar"></v-list-item>
                </v-list>
            </v-card>
        </div>
    </div>
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
.v-card {
    animation: fadeInLeft 0.5s normal;
}
</style>