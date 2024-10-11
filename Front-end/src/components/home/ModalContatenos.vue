<template>
<!--terminando o envio do usuario ao suporte do carreiras-->

  <div class="text pa-4">
    <div>
      <v-btn class="primary bg-purple-darken-2" @click="dialog = true">
        Contate-nos!
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="400" class="modal-container">
      <v-card class="form-container">
        <v-form fast-fail @submit.prevent="sendMessage">
          <div class="text-center mb-4">
            <img class="carreiras-logo" src="../../assets/logo.png" />
          </div>
          <v-divider class="mb-4"></v-divider>

          <p class="text-center" style="font-size: 25px;">Estamos ansiosos para ouvir você!</p>

          <v-divider class="mb-4"></v-divider>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            solo
            dense
            class="mb-2"
            hint="Exemplo@gmail.com"
            background-color="#f7f7f7"
          ></v-text-field>

          <v-textarea
            v-model="message"
            :rules="messageRules"
            label="Mensagem"
            solo
            dense
            class="mb-2"
            counter
            :counter-value="message.length"
            background-color="#f7f7f7"
          ></v-textarea>

          <v-btn
            class="mt-2 primary bg-purple-darken-2"
            type="submit"
            block
            :loading="loading"
          >
            <v-icon>mdi-send</v-icon> Enviar Mensagem
          </v-btn>

          <v-alert v-if="success" type="success" class="mt-4">
            Thank you for reaching out! We'll get back to you soon.
          </v-alert>

          <v-alert v-if="error" type="error" class="mt-4">
            Oops, something went wrong. Please try again!
          </v-alert>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    methods: {
    open() {
      this.dialog = true;
    },
  },
    loading: false,
    success: false,
    error: false,
    email: "",
    emailRules: [
      (value) => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return true;

        return "Email Invalido!";
      },
    ],
    message: "",
    messageRules: [
      (value) => {
        if (value?.length >= 10) return true;

        return "A Mensagem deve ter no Minimo 10 letras";
      },
    ],
  }),
  
  methods: {
    sendMessage() {
      this.loading = true;
      const careersEmail = "careers@institution.com";
      const subject = "Message from " + this.firstName + " " + this.lastName;
      const body = this.message;

      console.log(
        "Sending email to " +
          careersEmail +
          " with subject " +
          subject +
          " and body " +
          body
      );

      setTimeout(() => {
        this.loading = false;
        this.success = true;
      }, 2000);
    },
  },
};

</script>

<style scoped lang="scss">

.form-container {
  padding: 20px 10px;
}

.v-btn {
  font-size: 16px;
  font-weight: bold;
}

.v-icon {
  margin-right: 10px;
}

.carreiras-logo {
  margin-right: -30px;
  width: 300px;
  height: 100px;
}
</style>