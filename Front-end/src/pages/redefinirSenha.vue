<template>
    <div class="h-screen d-flex align-center back-primario">
        <v-container>
            <v-row no-gutters class="d-flex justify-center ma-5">
                <v-col cols="12" lg="4" md="6" sm="8" class="text-center">
                    <img width="200px" src="/src/assets/Logo_branco.png" class="ma-2">

                    <!-- form enviar -->
                    <v-card class="elevation-12" rounded="xl" v-if="formEnviar">
                        <v-card-text class="text-center">
                            <v-form class="ma-5 text-center" @submit.prevent="enviarCodigo">
                                <h1 class="text-center">Redefina sua senha</h1>
                                <p class="ma-5">Insira seu endereço de e-mail e lhe enviaremos instruções para redefinir
                                    sua
                                    senha.</p>
                                <v-text-field v-model="email" :rules="emailRules" label="E-mail"
                                    class="mb-2"></v-text-field>
                                <v-btn class="bg-purple-darken-4" @click="enviarCodigo" block>Continuar</v-btn>

                                <div class="ma-5 text-center">
                                    <v-btn size="small" variant="text" to="/empresa-candidato">Voltar para o
                                        Login.</v-btn>
                                </div>
                            </v-form>
                        </v-card-text>
                    </v-card>

                    <!-- form validar -->
                    <v-card class="py-8 px-6 text-center mx-auto ma-4 rounded-xl" elevation="12" max-width="400"
                        width="100%" v-if="formValidar">
                        <h3 class="text-h6 mb-4">Verifique seu E-mail</h3>
                        <div class="text-body-2">
                            Enviamos um código de verificação. <br> Verifique seu e-mail e insira o código abaixo.
                        </div>
                        <v-sheet color="surface">
                            <v-otp-input v-model="codigo" type="password" focus-all></v-otp-input>
                        </v-sheet>
                        <v-col cols="12">
                            <v-btn color="purple-darken-4" text="Verificar" variant="flat" block :loading="validating"
                                @click="validarCodigo"></v-btn>
                        </v-col>
                        <div class="text-caption">
                            Não recebeu o código?
                            <a href="#" @click="enviarCodigo">Reenviar</a>
                        </div>
                    </v-card>

                    <!-- form redefinir -->
                    <v-card class="elevation-12" rounded="xl" v-if="formRedefinir">
                        <v-card-text class="text-center">
                            <v-form class="ma-5 text-start d-flex flex-column ga-2" @submit.prevent="redefinirSenha">
                                <h3 class="text-center mb-2 text-h6 text-sm-h5 font-weight-bold	">Crie uma Nova Senha
                                </h3>
                                <v-text-field v-model="novaSenha" label="Nova senha"
                                    :rules="rules.novaSenha" type="password"></v-text-field>
                                <v-text-field v-model="confirmaSenha" label="Confirme a senha"
                                    :rules="rules.confirmaSenha" type="password"></v-text-field>
                                <v-btn elevation="0" class="bg-purple-darken-4" block type="submit">Salvar</v-btn>
                                <v-btn variant="text" to="/" block>cancelar</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-snackbar color="error" v-model="snackbar" :timeout="4000">
            {{ mensagem }}
        </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: 'thiago@gmail.com',
            emailRules: [
                (v) => !!v || 'E-mail requerido',
                (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
            ],
            grupo: '',
            formEnviar: true,
            formValidar: false,
            formRedefinir: false,
            validating: false,
            codigo: '',
            snackbar: false,
            novaSenha: 'Thiago1#',
            confirmaSenha: 'Thiago1#',
            rules: {
                novaSenha: [
                    (v) => !!v || 'Campo obrigatório.',
                    (v) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(v) || 'A senha deve ter 8 dígitos ou mais, 1 letra maiúscula, 1 caractere especial e 1 número.'
                ],
                confirmaSenha: [
                    (v) => !!v || 'Campo obrigatório.',
                    (v) => v === this.novaSenha || 'As senhas não são iguais.'
                ]
            },
            mensagem: '',
            dados: '',
        };
    },
    methods: {
        async enviarCodigo() {
            console.clear();
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/enviar/codigo`, {
                    email: this.email,
                    grupo: this.grupo
                }, { withCredentials: true });

                this.formEnviar = false;
                this.formValidar = true;

                console.log(response.data);
            } catch (error) {
                console.error('Erro', error.response.data);
                this.snackbar = true;
                this.mensagem = 'Não há usuário com este endereço de E-mail.';
            }
        },

        async validarCodigo() {
            console.clear();
            this.validating = true
            setTimeout(() => {
                this.validating = false
            }, 2000)

            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/validar/codigo`, {
                    email: this.email,
                    grupo: this.grupo,
                    codigo: this.codigo
                }, { withCredentials: true });

                this.formValidar = false;
                this.formRedefinir = true;

                this.dados = response.data.dados;
                console.log(this.dados);                

                // for (var key in response.data) {
                //     this.dados[key] = response.data[key];
                // }

                // for (var key in this.dados) {
                //     console.log('dados', this.dados[key]);
                // }

            } catch (error) {
                console.error('Erro', error.response.data);
                this.validating = true;
                this.mensagem = 'Código de verificação incorreto. Insira o código novamente.';
                setTimeout(() => {
                    this.validating = false;
                    this.snackbar = true;
                }, 2000)
            }
        },

        async redefinirSenha(event) {
            console.clear()

            const results = await event;            

            // alert(JSON.stringify(results, null, 2))
            // alert(this.novaSenha + '\n' + this.confirmaSenha)

            if (results.valid === true) {                
                console.log('Dados antes de enviar:', this.dados);  // Verifique aqui

                try {
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/redefinir/senha`, {
                        dados: this.dados,
                        novaSenha: this.novaSenha
                    }, { withCredentials: true });

                    console.log(response.data);

                } catch (error) {
                    console.error('Erro', error.response.data);
                }
            }
        },

        // envia para cadastro do user em questao na url
        goToSignUp() {
            if (window.location.href.includes("candidato")) {
                window.location.href = "cadastro-candidato"
            } else {
                window.location.href = "cadastro-empresa"
            }
        },
    },
    mounted() {
        this.$route.query.resposta;
        this.grupo = this.$route.query.resposta;
    },
};
</script>