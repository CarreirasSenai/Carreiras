<template>
  <div>
    <v-btn class="mt-3" color="deep-purple-accent-3" variant="outlined" @click="dialog = true">
      Contacte-nos!
    </v-btn>

    <v-dialog v-model="dialog" max-width="400">
      <v-btn @click="dialog = false" icon="mdi-close" size="x-small" class="mb-2 text-end"></v-btn>
      <v-card class="pa-10">        
        <v-form fast-fail @submit.prevent="sendMessage">
          <h2 class="text-center mb-5">Fale Conosco</h2>

          <div>
            <v-text-field v-model="email" :rules="emailRules" label="Insira seu e-mail" solo dense
              hint="Exemplo@gmail.com"></v-text-field>
            <v-textarea v-model="message" :rules="messageRules" label="Digite aqui o motivo do seu contato" solo dense
              class="mb-2" counter :counter-value="message.length"></v-textarea>
          </div>

          <v-btn color="deep-purple-accent-3" type="submit" block :loading="loading">
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
import axios from 'axios';

export default {
  data: () => ({
    dialog: false,
    loading: false,
    success: false,
    error: false,
    email: "",
    emailRules: [
      (value) => !!value || "O e-mail é obrigatório!", // Verifica se o campo não está vazio
      (value) => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return true;

        return "Email Inválido!";
      },
    ],
    message: "",
    messageRules: [
      (value) => !!value || "A mensagem é obrigatória!", // Verifica se o campo não está vazio
      (value) => {
        if (value?.length >= 10) return true;

        return "A Mensagem deve ter no mínimo 10 letras";
      },
    ],
  }),

  methods: {
    async sendMessage() {
      // Verifica se o formulário é válido antes de enviar
      const emailValid = this.emailRules.every(rule => rule(this.email) === true);
      const messageValid = this.messageRules.every(rule => rule(this.message) === true);

      if (!emailValid || !messageValid) {
        this.error = true;
        this.success = false;
        return; // Não envia a mensagem se a validação falhar
      }

      this.loading = true; // Inicia o carregamento
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/formulario/emailEnvio`,
          {
            email: this.email,
            mensagem: this.message,
          },
          { withCredentials: true }
        );

        if (response && response.data) {
          console.log("Mensagem enviada com sucesso", response.data);
          this.success = true;
          this.error = false;
        } else {
          console.error("Erro ao enviar mensagem");
          this.error = true;
          this.success = false;
        }
      } catch (error) {
        console.error("Erro ao enviar mensagem", error);
        this.error = true;
        this.success = false;
      } finally {
        this.loading = false; // Finaliza o carregamento
      }
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