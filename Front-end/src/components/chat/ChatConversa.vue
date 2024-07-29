<template>
    <!-- <div id="chat-home" class="bg-white h-75 w-25 rounded-t-lg mr-5 min-width-300"> -->
    <div id="chat-home"
        class="bg-white rounded-t-lg mr-5 ml-5 bottom-0 h-75 w-25 d-flex align-end justify-end flex-colunm min-width-300 h-vh-75">
        <v-container fluid class="chat-container d-flex flex-column h-100">
            <v-row class="ma-1" style="max-height: 50px;">
                <v-toolbar density="comfortable" class="bg-white border-b position-relative cursor-pointer"
                    @click="minimizeChat">
                    <v-list-item :title="'Nome do Fulano'"
                        :prepend-avatar="'https://randomuser.me/api/portraits/women/1.jpg'"
                        @click="visitaPerfil(title = 'Candidato ' + n)"></v-list-item>
                    <v-btn icon="mdi-close" class="position-absolute right-0"
                        @click="$emit('FecharChatConversa')"></v-btn>
                </v-toolbar>
            </v-row>
            <v-row class="ma-1 overflow-y-auto" id="conversa">
                <div class="w-100 ga-5">
                    <div v-for="n in 3" class="ma-0">
                        <div class="eu d-flex align-end justify-end ma-2">
                            <div class="w-75 d-flex flex-column align-end justify-end">
                                <p class="bg-deep-purple-lighten-5 pa-3 text-body-2">Olá me chamo Roselinda, estou
                                    falando aqui da J&J-Devs, seria sobre a vaga para
                                    Dev Junior.
                                    Ainda tem interesse na vaga?</p>
                                <small class="text-caption">20/12/2024, 15:00.</small>
                            </div>
                        </div>
                        <div class="ele d-flex align-start justify-start ma-2">
                            <div class="w-75">
                                <p class="bg-grey-lighten-3 pa-3 text-body-2">Olá Roselinda, muito obrigado por entrar
                                    em contato</p>
                                <small class="text-caption">20/12/2024, 15:01.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </v-row>
            <v-row class="d-flex align-center ma-0" style="max-height: 100px;" id="entrada">
                <v-form style="all: inherit;" class="mr-1 ml-1 pt-2 ga-2 d-flex align-start">
                    <v-btn icon="mdi-plus" variant="text"></v-btn>
                    <v-textarea label="Escreva aqui" variant="outlined" rows="2"
                        class="w-25 custom-textarea"></v-textarea>
                    <v-btn icon="mdi-send-outline" variant="text"></v-btn>
                </v-form>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        loaded: false,
        loading: false,
        minimize: true,
    }),

    methods: {
        onClick() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
            }, 2000)
        },
        minimizeChat() {
            const corpo = document.getElementById('chat-home');
            const conversa = document.getElementById('conversa');
            const entrada = document.getElementById('entrada');

            if (this.minimize === true) {
                corpo.classList.remove('h-vh-75');
                corpo.classList.add('corpo-minimizado');
                conversa.classList.add('conversa-minimizado');
                entrada.classList.add('entrada-minimizado');
            } else {
                corpo.classList.add('h-vh-75');
                corpo.classList.remove('corpo-minimizado');
                conversa.classList.remove('conversa-minimizado');
                entrada.classList.remove('entrada-minimizado');
            }

            this.minimize = !this.minimize;
        },
    },
}
</script>

<style scoped>
#chat-home {
    box-shadow: 0 4px 16px #333;
}

/* .dialogo-conversa::-webkit-scrollbar {
    width: 5px;
    height: 1px;
}

.dialogo-conversa::-webkit-scrollbar-thumb {
    background-color: #adadad;
} */
.corpo-minimizado {
    height: auto !important;
}

.conversa-minimizado {
    flex: 0 0 auto !important;
    height: 0 !important;
}

.entrada-minimizado {
    height: 0 !important;
}

.h-vh-75 {
    height: 75vh !important;
}
</style>