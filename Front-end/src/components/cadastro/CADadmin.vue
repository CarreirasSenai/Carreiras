<template>
  <v-container fluid class="signup-container fill-height">
    <v-row style="margin: 0" justify="center">
      <v-col cols="12" sm="9" md="10" lg="11">
        <v-card class="px-4 elevation-12 signup-card" rounded="xl">
          <span class="close" @click="close">&times;</span>
          <v-card-text>
            <h1 class="text-center my-1">Cadastro</h1>
            <v-form class="my-4" @submit.prevent="enviarCadastro">
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="nomeSocial" :rules="nomeSocialRules" label="Nome Social" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="nomeCompleto" :rules="nomeCompletoRules" label="Nome Completo"
                    bg-color="#F7F7F7" density="compact"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="phone" :rules="phoneRules" label="Telefone" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="cellphone" :rules="cellphoneRules" label="Celular" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="password" :rules="passwordRules" label="Senha" bg-color="#F7F7F7"
                    density="compact" type="password"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules" label="Repetir Senha"
                    bg-color="#F7F7F7" density="compact" type="password"></v-text-field>
                </v-col>
              </v-row>
              <div class="sign-in-buttons d-flex justify-center my-4">
                <v-btn text @click="resetForm">Cancelar</v-btn>
                <v-btn lass="adm-btn" class="bg-purple-darken-4 me-2" @click="enviarCadastro">Salvar</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Alerta PopUp -->
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="surface-variant" text="Open Dialog" variant="flat" id="btnAlertaCadastro"
        class="d-none"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Ops!" class="text-purple-darken-4" v-if="resposta === false">
        <v-card-text class="text-center text-h7 text-black border-sm pa-10">
          {{ mensagemErro }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="ok" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="text-purple-darken-4" v-else-if="resposta === true">
        <v-card-title>Zuuuuuuuuu 🐝</v-card-title>
        <v-card-text class="text-center text-h7 text-black border-sm pa-10">
          Cadastro realizado com sucesso!<span class="mdi mdi-check-bold text-green text-h6"></span>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
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
      password: '12345678Ww@',
      confirmPassword: '12345678Ww@',
      resposta: false,
      mensagemErro: '',

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
      ]
    };
  },
  methods: {
    close() {
            this.localVisible = false;
        }, 
    resetForm() {
            this.nomeSocial = '';
            this.nomeCompleto = '';
            this.email = '';
            this.phone = '';
            this.cellphone = '';
            this.password = '';
            this.confirmPassword = '';
        },

    async enviarCadastro() {
      try {
        const response = await axios.post('http://localhost:4000/admin/create', {
          nomeSocial: this.nomeSocial,
          nomeCompleto: this.nomeCompleto,
          email: this.email,
          phone: this.phone,
          cellphone: this.cellphone,
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
</script>

<style lang="scss" scoped>
.close{
  margin: 10px 10px 0px 0px;
}

.signup-container {
  background-color: #6832d2 !important;
  height: 100% !important;
}

.signup-card {
  margin: 0 auto;
  width: auto;
  max-width: 1100px;
}

.v-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carreiras-logo {
  height: 70px;
  width: fit-content;
  margin: 0 10px;
}

.sign-in-buttons {
  margin-top: 20px;
}

.adm-btn {
  border: thin solid #3a1c76 !important;
  color: #3a1c76 !important;
  size: "large";
}

.got-account-container {
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: #4b13bb;

    &:hover {
      color: #763aee;
    }
  }
}
</style>