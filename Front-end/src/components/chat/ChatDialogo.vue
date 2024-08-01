<template>
    <div class="dialogo">
        <div class="dialogo-barra">
            <v-list lines="one" class="lista-users">
                <v-list-item v-for="n in 1" :key="n" :title="'Candidato ' + n" subtitle="Online"
                    :prepend-avatar="'https://randomuser.me/api/portraits/women/' + n + '.jpg'">
                </v-list-item>
            </v-list>
            <!-- <p>Assunto: Vaga de Estágio</p> -->
            <span class="mdi mdi-account-box" @click="novaConversa()"></span>
        </div>
        <div class="dialogo-conversa">
            <div v-for="n in 5" style="margin: 0;">
                <div class="eu">
                    <div>
                        <p>Olá me chamo Roselinda, estou falando aqui da J&J-Devs, seria sobre a vaga para Dev Junior.
                            Ainda tem interesse na vaga?</p>
                        <small>20/12/2024, 15:00.</small>
                    </div>
                </div>
                <div class="ele">
                    <div>
                        <p>Olá Roselinda, muito obrigado por entrar em contato</p>
                        <small>20/12/2024, 15:01.</small>
                    </div>
                </div>
            </div>
        </div>
        <form action="/mensagem/enviar" method="post" enctype="multipart/form-data" class="dialogo-enviar">
            <label for="anexo"><span class="mdi mdi-paperclip"></span></label>
            <input type="file" id="anexo" name="anexo" hidden @change="mostrarArquivo()">
            <textarea name="mensagem" placeholder="Escreva uma mensagem..."></textarea>
            <button type="submit"><span class="mdi mdi-send"></span></button>
            <div class="dialogo-img" style="display: none;">
                <span class="mdi mdi-close-circle" @click="cancelarEnvio()"></span>
                <img src="" id="preview" alt="Preview">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            circulo: 'mdi mdi-circle-medium'
        };
    },

    mounted() {
        this.detectOS();
    },

    methods: {
        novaConversa() {
            if (window.innerWidth < 800) {
                document.querySelector('.dialogo').style.display = 'none';
                document.querySelector('.div-users').style.display = 'block';
                document.querySelector('.menu-mob').style.display = 'flex';
            }
        },

        detectOS() {
            var userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
            var dialogoElement = document.querySelector('.dialogo');

            if (!dialogoElement) return;

            // Detectar iOS
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                dialogoElement.classList.add('ios');
            }
            // Detectar Android
            else if (/android/i.test(userAgent)) {
                dialogoElement.classList.add('android');
            }
        },

        mostrarArquivo() {
            const inputImagem = document.getElementById('anexo');
            if (inputImagem.files && inputImagem.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imagemPreview = document.getElementById('preview');
                    imagemPreview.src = e.target.result;
                    document.querySelector('.dialogo-img').style.display = 'flex';
                }
                reader.readAsDataURL(inputImagem.files[0]);
            }
        },

        cancelarEnvio() {
            const imagemPreview = document.getElementById('preview');
            imagemPreview.src = "";
            document.querySelector('.dialogo-img').style.display = 'none';
        }
    }
}
</script>

<style scoped>
.dialogo {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
}

.dialogo-conversa::-webkit-scrollbar {
    width: 5px;
    height: 1px;
}

.dialogo-conversa::-webkit-scrollbar-thumb {
    background-color: #adadad;
}

.dialogo-barra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 80px;
    border-bottom: 1px solid #ddd;
    position: fixed;
    width: 100%;
    background-color: white;
    z-index: 1;
}

.mdi-account-box {
    display: block;
    color: #5E17EB;
    margin: 10px;
}

.dialogo-conversa {
    height: 100vh;
    padding-top: 80px;
    padding-bottom: 100px;
    overflow: auto;
    background-color: white;
}

.dialogo-conversa div {
    margin: 10px;
}

.dialogo-conversa div p {
    padding: 10px;
    border-radius: 15px;
    background-color: #eee;
    color: #333;
}

.eu div,
.ele div {
    min-width: 250px;
    max-width: 60%;
}

.eu {
    display: flex;
    align-items: end;
    justify-content: end;
}

.eu div {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
}

small {
    width: 120px;
    text-align: end;
    color: #666;
}

.ele {
    display: flex;
    align-items: start;
    justify-content: start;
}

.dialogo-enviar {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    background-color: white;
    border-top: 1px solid #ddd;
    padding-bottom: 80px;
}

.dialogo-enviar textarea {
    background-color: #eee;
    border: 1px solid #ddd;
    height: 50px !important;
    height: auto;
    border-radius: 30px;
    padding: 12px 20px 0 20px;
    outline: none;
    color: #333;
    width: 100%;
    resize: none;
}

.dialogo-enviar .mdi {
    font-size: 30px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialogo-img {
    position: absolute;
    bottom: 95px;
    left: 0;
    /* min-height: 100px;
    max-height: 100px; */
    width: 100%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialogo-img img {
    max-width: 300px;
    max-height: 300px;
}

.mdi-close-circle {
    position: absolute;
    top: 0;
    left: 0;
    color: #333;
    height: 30px;
}

@media(max-width:800px) {
    .dialogo {
        display: none;
    }

    .dialogo-conversa {
        height: auto;
    }

    .dialogo-img {
        bottom: 65px;
    }

    .mdi-plus-circle {
        display: block;
    }

    .dialogo-enviar {
        padding: 5px;
        position: fixed;
    }
}

@media(min-width:801px) {
    .mdi-plus-circle {
        display: none;
    }
}
</style>