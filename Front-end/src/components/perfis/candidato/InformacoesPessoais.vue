<template>
    <!-- <v-container class="ma-8"> -->
        <!-- <v-row class="ma-5">
            <v-col cols="12" md="6" sm="12" xs="12"> -->
                <!-- <v-card title="Informações Pessoais" class="ma-8 mt-0"> -->
                <v-card title="Informações Pessoais">
                    <v-card-text class="d-flex">
                        <v-container>
                            <v-row>
                                <v-col cols="6" md="2" class="infos-pessoais">
                                    <p>Nome:</p>
                                    <p>Sob.</p>
                                    <p>E-mail:</p>
                                    <p>Tel.:</p>
                                    <p>Celular:</p>
                                    <p>CPF:</p>
                                    <p>Senha:</p>
                                </v-col>
                                <v-col cols="6" md="4" class="infos-valores">
                                    <p>Gil</p>
                                    <p>Machado da Silva</p>
                                    <p>gmachado@gmail.com</p>
                                    <p>(47) 8889-8888</p>
                                    <p>(47) 9 8889-8888</p>
                                    <p>123.456.782-19</p>
                                    <p>***********</p>
                                </v-col>
                                <v-col cols="6" md="3" class="infos-pessoais">
                                    <p>CEP:</p>
                                    <p>Rua:</p>
                                    <p>Núm.:</p>
                                    <p>Comp.:</p>
                                    <p>Bairro:</p>
                                    <p>Cidade:</p>
                                    <p>Estado:</p>
                                </v-col>
                                <v-col cols="6" md="3" class="infos-valores">
                                    <p>87.564-879</p>
                                    <p>Rua Tico Tico</p>
                                    <p>45</p>
                                    <p>Casa</p>
                                    <p>América</p>
                                    <p>Joinville</p>
                                    <p>SC</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <button class="text-none font-weight-regular mdi mdi-pencil mr-3 mb-1" variant="text"></button>
                    </v-card-actions>
                </v-card>
            <!-- </v-col>
        </v-row> -->
    <!-- </v-container> -->
</template>

<style>
* {
    /* border: 1px solid red; */
}

p {
    margin: 5px;
}

.infos-pessoais p {    
    color: #6732d2af;
    font-weight: bold;
}
</style>

<!-- <template>
    <v-card title="Informações Pessoais" class="ma-8 mb-4">
        <v-card-text>
            <v-container>
                <v-form class="my-4" @submit.prevent="enviarCadastro">
                    <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field v-model="nomeSocial" :rules="nomeSocialRules" label="Nome Social"
                                 variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field v-model="nomeCompleto" :rules="nomeCompletoRules" label="Nome Completo"
                                 variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="phone" :rules="phoneRules" label="Telefone" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="cellphone" :rules="cellphoneRules" label="Celular" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="cpf" :rules="cpfRules" label="CPF" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="cep" :rules="confirmcepRules" label="CEP" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field v-model="rua" :rules="ruaRules" label="Rua" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="numCasa" :rules="confirmnumeroRules" label="Nº" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="complemento" :rules="complementoRules" label="Complemento"
                                 variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="bairro" :rules="bairroRules" label="Bairro" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="cidade" :rules="cidadeRules" label="Cidade" 
                                variant="underlined" :disabled="isDisabled"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-select v-model="estado" :rules="estadoRules" :items="items" label="Estado"
                                 variant="underlined" :disabled="isDisabled"></v-select>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="password" :rules="passwordRules" label="Senha" 
                                variant="underlined" :disabled="isDisabled" type="password"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules" label="Repetir Senha"
                                 variant="underlined" :disabled="isDisabled" type="password"></v-text-field>
                        </v-col>
                    </v-row>
                    <div class="sign-in-buttons d-flex justify-center my-4">
                        <v-btn lass="adm-btn" class="bg-purple-darken-4 me-2" @click="enviarCadastro">Cadastrar</v-btn>
                    </div>
                </v-form>
            </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
            <v-btn class="bt-primario">Editar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            nomeSocial: 'Thiago',
            nomeCompleto: 'Thiag Lima',
            email: 'thiago@gmail.com',
            phone: '4700000000',
            cellphone: '47000000000',
            cpf: '00000000000',
            cep: "00000000",
            confirmcep: '',
            rua: 'Rua Bonita',
            numCasa: '00',
            complemento: 'cabana',
            bairro: 'Bairro Bonito',
            cidade: 'Bonita',
            estado: 'SC',
            password: '12345678Ww@',
            confirmPassword: '12345678Ww@',
            resposta: false,
            mensagemErro: '',
            isDisabled: true,

            nomeSocialRules: [
                (v) => !!v || "Nome Social Requerido",
                (v) => v.length >= 3 || "Nome Social deve ter pelo menos 3 caracteres",
            ],

            nomeCompletoRules: [
                (v) => !!v || "Nome Completo Requerido",
                (v) =>
                    v.length >= 5 || "Nome Completo deve ter pelo menos 5 caracteres",
            ],

            emailRules: [
                (v) => !!v || "E-mail requerido",
                (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
                (v) => v.length <= 254 || "E-mail deve ter no máximo 254 caracteres",
            ],
            cellphoneRules: [
                (v) => !!v || "Celular requerido",
                (v) => v.length >= 10 || "Celular deve ter pelo menos 10 caracteres",
                (v) => /^\d+$/.test(v) || "Celular deve conter apenas números",
            ],
            phoneRules: [
                (v) => !!v || "Telefone requerido",
                (v) => v.length >= 10 || "Telefone deve ter pelo menos 10 caracteres",
                (v) => /^\d+$/.test(v) || "Telefone deve conter apenas números",
            ],

            cpfRules: [
                (v) => !!v || "CPF Requerido",
                (v) => v.length === 11 || "CPF deve ter 11 caracteres",
                (v) => /^\d+$/.test(v) || "CPF deve conter apenas números",
            ],

            confirmcepRules: [
                (v) => !!v || "CEP Requerido",
                (v) => v.length === 8 || "CEP deve ter 8 caracteres",
                (v) => /^\d+$/.test(v) || "CEP deve conter apenas números",
            ],

            confirmnumeroRules: [
                (v) => !!v || "Nº Requerido",
                (v) => v.length >= 1 || "Nº deve ter pelo menos 1 caractere",
            ],

            complementoRules: [
                (v) => !!v || "Complemento Requerido",
                (v) => v.length >= 3 || "Complemento deve ter pelo menos 3 caracteres",
            ],

            ruaRules: [
                (v) => !!v || "Endereço Requerido",
                (v) => v.length >= 5 || "Endereço deve ter pelo menos 5 caracteres",
            ],

            bairroRules: [
                (v) => !!v || "Bairro Requerido",
                (v) => v.length >= 3 || "Bairro deve ter pelo menos 3 caracteres",
            ],

            cidadeRules: [
                (v) => !!v || "Cidade Requerida",
                (v) => v.length >= 3 || "Cidade deve ter pelo menos 3 caracteres",
            ],

            estadoRules: [
                (v) => !!v || "Estado Requerido"
            ],

            passwordRules: [
                (v) => !!v || "Senha Requerida",
                (v) => v.length >= 8 || "Senha deve ter pelo menos 8 caracteres",
                (v) =>
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
                        v
                    ) ||
                    "Senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial",
            ],

            confirmPasswordRules: [
                (v) => !!v || "Repetir Senha Requerida",
                (v) => v === this.password || "Senhas não coincidem",
            ],
            items: [
                'SC',
                'SP',
                'RJ',
                'PR',
                'RS',
                'RN'
            ]
        };
    },
    methods: {
        async enviarCadastro() {
            try {
                const response = await axios.post('http://localhost:4000/update/create', {
                    nomeSocial: this.nomeSocial,
                    nomeCompleto: this.nomeCompleto,
                    email: this.email,
                    phone: this.phone,
                    cellphone: this.cellphone,
                    cpf: this.cpf,
                    cep: this.cep,
                    rua: this.rua,
                    numCasa: this.numCasa,
                    complemento: this.complemento,
                    bairro: this.bairro,
                    cidade: this.cidade,
                    estado: this.estado,
                    password: this.password,
                });

                this.resposta = true;
                console.log('Cadastro bem-sucedido', response.data);
                document.getElementById('btnAlertaCadastro').click();

            } catch (error) {
                this.resposta = false;
                console.error('Erro no cadastro', error.response.data.error);
                this.mensagemErro = error.response.data.error;
                document.getElementById('btnAlertaCadastro').click();
            }
        },
    },
};
</script> -->