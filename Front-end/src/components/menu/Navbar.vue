<template>
    <ChatLayout ref="chatLayout" />

    <v-container>
        <v-app-bar scroll-behavior="elevate">
            <div class="navbar-container">
                <a href="/" class="d-flex justify-center align-center">
                    <img class="carreiras-logo" src="../../assets/logo.png">
                </a>

                <!-- <ADM / LOGIN /> -->
                <div class="sign-in-buttons" v-if="user.visibilidadeNaoLogado">
                    <v-btn class="adm-btn" variant="outlined">
                        Adm
                    </v-btn>
                    <v-btn class="bg-purple-darken-4" @click="redirectToLogin">
                        Login
                    </v-btn>
                </div>

                <!-- <NavbarLogado /> -->
                <div class="user-account-avatar d-flex align-center ga-2" v-if="user.visibilidadeLogado">
                    <h1 class="text-grey-darken-4 text-subtitle-2">{{ user.email }}</h1>
                    <v-menu min-width="200px" rounded>
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props">
                                <v-avatar color="brown" size="45">
                                    <span class="text-h5">{{ user.initials }}</span>
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-text>
                                <div class="mx-auto text-center">
                                    <v-avatar color="brown">
                                        <span class="text-h5">{{ user.initials }}</span>
                                    </v-avatar>
                                    <h3>{{ user.fullName }}</h3>
                                    <p class="text-caption mt-1">
                                        {{ user.email }}
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
import { useUserStore } from '@/stores/candidato';

export default {
    created() {
        // this.userLogado();
    },

    data: () => ({
        // user: {
        //     initials: 'JD',
        //     fullName: 'Junior Dev',
        //     email: 'juniordev@gmail.com',
        // },
        // visibilidadeNaoLogado: true,
        // visibilidadeLogado: false,
    }),

    computed: {
        user() {
            return useUserStore();
        }
    },

    mounted() {
        const user = this.user;
        user.userLogado();
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

        // Autenticar usúario e coletar dados
        // async userLogado() {
        //     try {
        //         const response = await axios.get('http://localhost:4000/candidato/read', {
        //             withCredentials: true
        //         });

        //         this.user.initials = extrairIniciais(response.data.usuario.nome_completo);
        //         this.user.fullName = response.data.usuario.nome_completo;
        //         this.user.email = response.data.usuario.email;
        //         this.visibilidadeNaoLogado = !this.visibilidadeNaoLogado;
        //         this.visibilidadeLogado = !this.visibilidadeLogado;

        //         console.log('Usúario autenticado!', response.data);

        //     } catch (error) {
        //         console.error('Erro ao obter dados do usuário', error.response ? error.response.data : error.message);
        //         this.$router.push('/');
        //     }
        // },

        // Fazer o Logout
        async logout() {
            try {
                const response = await axios.get('http://localhost:4000/logout', {
                    withCredentials: true  // Importante: enviar cookies com a requisição
                });
                console.log(response.data);
                this.$router.push('/');
                window.location.reload();
            } catch (error) {
                console.error('Erro ao efetuar Logout', error.response);
            }
        },
    }
}

// function extrairIniciais(nomeCompleto) {
//     const palavras = nomeCompleto.split(" ");

//     const primeiroNome = palavras[0];
//     const segundoNome = palavras.length > 1 ? palavras[1] : "";

//     const inicialPrimeiroNome = primeiroNome.charAt(0).toUpperCase();
//     const inicialSegundoNome = segundoNome.charAt(0).toUpperCase();

//     const iniciais = inicialPrimeiroNome + inicialSegundoNome;

//     return iniciais;
// }

</script>

<style lang="scss">
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

.sign-in-buttons {
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