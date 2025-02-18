<template>
    <!-- Editar 1 perfil candidato-->
    <div class="text-center">
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn variant="text" v-bind="activatorProps" class="w-100 rounded-0 justify-start">Editar Links</v-btn>
            </template>

            <v-card title="Editar Links">
                <v-form @submit.prevent="saveForm">
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-text-field :rules="instagramRules" prepend-icon="mdi mdi-instagram"
                                    label="instagram.com/" variant="underlined" v-model="link_instagram"></v-text-field>
                                <v-text-field :rules="facebookRules" prepend-icon="mdi mdi-facebook"
                                    label="facebook.com/" variant="underlined" v-model="link_facebook"></v-text-field>
                                <v-text-field :rules="linkedinRules" prepend-icon="mdi mdi-linkedin"
                                    label="linkedin.com/" variant="underlined" v-model="link_linkedin"></v-text-field>
                                <v-text-field :rules="githubRules" prepend-icon="mdi mdi-github" label="github.com/"
                                    variant="underlined" v-model="link_github"></v-text-field>
                                <v-text-field prepend-icon="mdi mdi-web" label="www.seusite.com" variant="underlined"
                                    v-model="link_site_pessoal" :rules="siteRules"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="Limpar" variant="plain" @click="clearForm" class="border-red-accent-4"></v-btn>
                        <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
                        <v-btn text="Salvar" color="Enviar" variant="tonal" type="submit"
                            class="bg-purple-darken-4"></v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-snackbar :color="snackbarColor" v-model="snackbar" :timeout="4000">
            <div class="text-center">{{ mensagem }}</div>
        </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useCandidatoStore } from '@/stores/candidato';

export default {
    data: () => ({
        dialog: false,
        id: '',
        link_instagram: '',
        link_facebook: '',
        link_linkedin: '',
        link_github: '',
        link_site_pessoal: '',
        snackbar: false,
        snackbarColor: '',
        mensagem: '',
        instagramRules: [
            (v) => {
                if (!v || v.trim() === '') return true;
                const regex = /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/;
                return regex.test(v) || "Insira um link válido do Instagram com HTTPS";
            },
        ],
        facebookRules: [
            (v) => {
                if (!v || v.trim() === '') return true;
                const regex = /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?$/;
                return regex.test(v) || "Insira um link válido do Facebook com HTTPS";
            },
        ],
        linkedinRules: [
            (v) => {
                if (!v || v.trim() === '') return true;
                const regex = /^https:\/\/(www\.)?linkedin\.com\/[a-zA-Z0-9._-]+(?:\/.*)?$/;
                return regex.test(v) || "Insira um link válido para o LinkedIn com HTTPS";
            },
        ],
        githubRules: [
            (v) => {
                if (!v || v.trim() === '') return true;
                const regex = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9._-]+\/?$/;
                return regex.test(v) || "Insira um link válido do Github com HTTPS";
            },
        ],
        siteRules: [(v) => {
            if (!v || v.trim() === '') return true;
            const regex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
            return regex.test(v) || "Insira um link válido que comece com HTTPS";
        }]
    }),
    computed: {
        auth() {
            return useAuthStore();
        },
        usuario() {
            return useCandidatoStore();
        }
    },
    created() {
        this.auth.autenticacao();
    },
    mounted() {
        this.id = useCandidatoStore().dadosUser.id,
            this.link_instagram = useCandidatoStore().dadosUser.link_instagram,
            this.link_facebook = useCandidatoStore().dadosUser.link_facebook,
            this.link_linkedin = useCandidatoStore().dadosUser.link_linkedin,
            this.link_github = useCandidatoStore().dadosUser.link_github,
            this.link_site_pessoal = useCandidatoStore().dadosUser.link_site_pessoal
    },
    methods: {
        // Função para filtrar profissões com base na entrada do usuário
        filterProfissoes(item, queryText) {
            // Converte o item e a consulta para minúsculas para comparação
            const query = queryText.toLowerCase();
            return item.toLowerCase().includes(query);
        },
        clearForm() {
            this.link_instagram = '';
            this.link_facebook = '';
            this.link_github = '';
            this.link_linkedin = '';
            this.link_site_pessoal = '';
        },
        async saveForm(event) {
            const dados = await event;

            if (dados.valid === true) {
                try {
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/candidato/update/links`, {
                        id: this.id,
                        link_instagram: this.link_instagram,
                        link_facebook: this.link_facebook,
                        link_linkedin: this.link_linkedin,
                        link_github: this.link_github,
                        link_site_pessoal: this.link_site_pessoal
                    },
                        { withCredentials: true });
                    console.log("Deu certo :) ", response.result);
                    this.snackbarColor = 'success';
                    this.mensagem = 'Links atualizados com sucesso.';
                    this.snackbar = true;
                    this.dialog = false;
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500)
                } catch (error) {
                    console.error("Erro: ", error);
                    this.snackbarColor = 'error';
                    this.mensagem = 'Houve um erro ao atualizar os links.';
                    this.snackbar = true;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.mdi {
    color: #6732d2af;
}

.mdi:hover {
    color: #6732d2;
}

.div-button-edit {
    border-radius: 100%;
    height: 50px;
    width: 50px;
    position: absolute !important;
    right: 0;
    top: 115px;
}
</style>