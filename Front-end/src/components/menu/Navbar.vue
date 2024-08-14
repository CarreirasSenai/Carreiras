<template>
    <ChatLayout ref="chatLayout" />

    <v-container>
        <v-app-bar scroll-behavior="elevate">
            <div class="navbar-container position-relative">
                <a href="/" class="d-flex justify-center align-center">
                    <img class="carreiras-logo" src="../../assets/logo.png">
                </a>

                <!-- <ADM / LOGIN /> -->
                <!-- <div class="d-flex ga-1 ma-1" v-if="user.visibilidadeNaoLogado">
                    <v-btn class="adm-btn" variant="outlined">
                        Adm
                    </v-btn>
                    <v-btn class="bg-purple-darken-4" @click="redirectToLogin">
                        Login
                    </v-btn>
                </div> -->

                <!-- Aqui o Menu com opções visiveis que o sestito pediu e tbm a versão mob -->
                <div v-if="user.visibilidadeNaoLogado" class="ma-2">
                    <div v-if="visibilidadeMenuInicial" class="d-flex align-center ga-15">
                        <div class="d-flex ga-10 position-absolute left-0 right-0 justify-center">
                            <button>Início</button>
                            <button>Sobre a Carreiras</button>
                            <button>Contate-nos</button>
                        </div>
                        <v-btn class="bg-deep-purple-accent-4 pa-2 ma-2">
                            <v-icon>mdi-account</v-icon>
                            Minha Conta
                            <v-menu activator="parent">
                                <v-list class="d-flex flex-column">
                                    <v-list-item>
                                        <v-btn class="w-100" variant="text" prepend-icon="mdi-login"><a href="/login">Entrar</a></v-btn>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-btn class="w-100" variant="text"
                                            prepend-icon="mdi-account-plus"><a href="/cadastro-candidato">Cadastrar</a></v-btn>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-btn class="w-100" variant="text"
                                            prepend-icon="mdi-shield-account">Adm</v-btn>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-btn>
                    </div>
                    <MenuMobile v-if="visibilidadeMenuMobilie" />
                </div>

                <!-- <NavbarLogado /> -->
                <div class="user-account-avatar d-flex align-center ga-2" v-if="user.visibilidadeLogado">
                    <h1 class="text-grey-darken-4 text-subtitle-2">{{ user.user.email }}</h1>
                    <v-menu min-width="200px" rounded>
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props">
                                <v-avatar color="brown" size="45">
                                    <span class="text-h5">{{ user.user.initials }}</span>
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-text>
                                <div class="mx-auto text-center">
                                    <v-avatar color="brown">
                                        <span class="text-h5">{{ user.user.initials }}</span>
                                    </v-avatar>
                                    <h3>{{ user.user.fullName }}</h3>
                                    <p class="text-caption mt-1">
                                        {{ user.user.email }}
                                    </p>

                                    <v-divider class="my-2"></v-divider>
                                    <v-btn variant="text" rounded @click='redirectToHome'>
                                        Home
                                    </v-btn>

                                    <v-divider class="my-2"></v-divider>
                                    <v-btn variant="text" rounded @click='redirectToSchedule'>
                                        Agenda
                                    </v-btn>

                                    <v-divider class="my-2"></v-divider>
                                    <v-btn variant="text" @click="triggerAbrirChatHome">Chat</v-btn>

                                    <v-divider class="my-2"></v-divider>
                                    <v-btn variant="text" rounded @click='redirectToProfile'>Perfil</v-btn>

                                    <v-divider class="mt-2 mb-4"></v-divider>
                                    <v-btn variant="text" rounded prepend-icon="mdi-logout" @click="logout">Sair</v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </div>
            </div>
        </v-app-bar>
    </v-container>
</template>

<script>
import axios from 'axios';
import { useCandidatoStore } from '@/stores/candidato';
import MenuInicial from './MenuMobile.vue';
import MenuMobile from './MenuMobile.vue';

export default {
    data: () => ({
        visibilidadeMenuInicial: true,
        visibilidadeMenuMobilie: false,
    }),

    computed: {
        user() {
            return useCandidatoStore();
        }
    },

    mounted() {
        const user = this.user;
        user.userLogado();

        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },

    methods: {
        redirectToLogin() {
            this.$router.push('/empresa-candidato');
        },
        redirectToHome() {
            this.$router.push('/');
        },
        redirectToSchedule() {
            this.$router.push('/agenda-candidato');
        },
        redirectToChat() {
            this.$router.push('/chat');
        },
        redirectToProfile() {
            this.$router.push('/perfil-candidato');
        },
        triggerAbrirChatHome() {
            // Access the ChatLayout component and call its method
            this.$refs.chatLayout.abrirChatHome();
        },

        // Fazer o Logout
        async logout() {
            try {
                const response = await axios.get('http://localhost:4000/logout', {
                    withCredentials: true  // Importante: enviar cookies com a requisição
                });
                console.log(response.data);
                window.location.reload();
                this.$router.push('/');
            } catch (error) {
                console.error('Erro ao efetuar Logout', error.response);
            }
        },

        handleResize() {
            if (window.innerWidth < 1000) {
                this.visibilidadeMenuInicial = false;
                this.visibilidadeMenuMobilie = true;
            } else {
                this.visibilidadeMenuInicial = true;
                this.visibilidadeMenuMobilie = false;
            }
        }
    }
}
</script>

<style lang="scss">
* {
    // border: 1px solid red;
}

.v-container {
    padding: 0 !important;
}

.v-app-bar {
    border-bottom: 1px solid #C3C3C3 !important;
}

.navbar-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.carreiras-logo {
    width: 150px;
    margin-left: 10px;
}

.sign-in-v-btns {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    gap: 10px;
}

.adm-btn {
    border: thin solid #3A1C76 !important;
    color: #3A1C76 !important;
}

.v-btn a {
    text-decoration: none;
    color: black;
}

.user-account-avatar {
    margin: 0 20px;
}
</style>