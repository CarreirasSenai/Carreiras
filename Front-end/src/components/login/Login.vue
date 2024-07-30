<template>
  <v-container fluid class="login-container fill-height">
    <v-row style="margin: 0;" justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="logo-container text-center">
          <img class="carreiras-logo" src="/src/assets/Logo_branco.png" alt="">
        </div>
        <v-card class="elevation-12" rounded="xl">
          <v-card-text>
            <h1 class="text-center my-1 xs:text-h1">Login</h1>
            <v-form class="my-3" @submit.prevent="login">
              <v-text-field v-model="email" :rules="emailRules" label="E-mail" class="mb-4"
                bg-color="#F7F7F7"></v-text-field>
              <v-text-field v-model="password" :rules="passwordRules" label="Senha" bg-color="#F7F7F7"
                type="password"></v-text-field>
              <div class="text-center pa-2 text-red d-none" id="aviso-invalido">Email ou senha inválidos.</div>
              <div class="sign-in-buttons d-flex justify-center align-center">
                <v-btn class="bg-purple-darken-4 me-2 w-25 min-w-btn" @click="login">Entrar</v-btn>
                <v-btn class="adm-btn w-25 min-w-btn" variant="outlined" cl>
                  <a href="/cadastro-candidato">Cadastre-se</a>
                </v-btn>
              </div>
              <p class="forgot-password" @click="forgotPassword">Esqueci minha senha</p>
              <div class="api-google">
                <br>
                <!--Usar aqui a api-->
                <br>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      password: '12345678Ww@',
      passwordRules: [(v) => !!v || 'Senha requerida'],
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:4000/user/login', {
          email: this.email,
          password: this.password
        }, { withCredentials: true });

        console.log('Login bem-sucedido', response.data);
        this.$router.push('/');
      } catch (error) {
        console.error('Erro no login', error.response.data);
        document.getElementById('aviso-invalido').classList.add('d-block');
      }
    },
    forgotPassword(){
      window.alert("Redirecionar para a tela de esqueci minha senha");
    },
  },
  mounted() {
    this.$route.query.resposta;
  },
};

</script>

<style lang="scss" scoped>
.login-container {
  background-color: #6832D2 !important;
  height: 100% !important;
}

.v-row {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
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
}

.forgot-password {
  text-align: center;
  margin: 20px auto;
  color: #4b13bb;
  text-decoration: underline;

  &:hover {
    color: #763aee;
    cursor: pointer;
  }
}

.min-w-btn{
  min-width: 120px;
}
</style>