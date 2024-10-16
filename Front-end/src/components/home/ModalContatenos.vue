<template>

  <div class="text pa-4">
    <div>
      <v-btn class="primary bg-purple-darken-2" @click="dialog = true">
        Contate-nos!
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card class="form-container">
        
        <!-- Ícone de Fechar (X) sem botão -->
        <v-icon
          class="close-icon"
          @click="dialog = false"
        >
          mdi-close
        </v-icon>

        <v-form fast-fail @submit.prevent="sendMessage">
          
          <!-- Logo Section -->
          <div class="text-center mb-4">
            <img class="carreiras-logo" src="../../assets/logo.png" alt="Carreiras Logo" />
          </div>
          

          <!-- Form Title -->
          <p class="text-center" style="font-size: 20px; font-weight: 500;">
            Estamos ansiosos para ouvir você!
          </p>

          <v-divider class="mb-4"></v-divider>

          <!-- Email Input Field -->
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            solo
            dense
            class="mb-2"
            color="primary"
            background-color="#f7f7f7"
            hint="exemplo@gmail.com"
            prepend-inner-icon="mdi-email"
          ></v-text-field>

          <!-- Message Textarea -->
          <v-textarea
            v-model="message"
            :rules="messageRules"
            label="Mensagem"
            solo
            dense
            class="mb-2"
            color="primary"
            hint="Escreva sua mensagem"
            counter
            background-color="#f7f7f7"
            :counter-value="message.length"
            prepend-inner-icon="mdi-message-text"
          ></v-textarea>

          <!-- Submit Button -->
          <v-btn
            class="mt-2 primary bg-purple-darken-2"
            type="submit"
            block
            :loading="loading"
            elevation="2"
          >
            <v-icon left>mdi-send</v-icon> Enviar Mensagem
          </v-btn>

          <!-- Success Alert -->
          <v-alert v-if="success" type="success" class="mt-4">
            Obrigado por entrar em contato! Responderemos em breve.
          </v-alert>

          <!-- Error Alert -->
          <v-alert v-if="error" type="error" class="mt-4">
            Oops, algo deu errado. Tente novamente, por favor!
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
    loading: false,
    success: false,
    error: false,
    email: "",
    message: "",
    emailRules: [
      (value) => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return true;
        return "Email inválido!";
      },
    ],
    messageRules: [
      (value) => {
        if (value?.length >= 10) return true;
        return "A mensagem deve ter no mínimo 10 caracteres.";
      },
    ],
  }),
  
  methods: {
    sendMessage() {
      this.loading = true;
      setTimeout(() => {
        if (this.email && this.message) {
          this.success = true;
          this.error = false;
          this.email = "";
          this.message = "";
        } else {
          this.error = true;
          this.success = false;
        }
        this.loading = false;
      }, 2000);
    },
  },
};
</script>

<style scoped lang="scss">
.form-container {
  padding: 30px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.v-btn {
  font-size: 16px;
  font-weight: bold;
}

.v-icon {
  margin-right: 8px;
}

.carreiras-logo {
  width: 250px;
  height: 80px;
}

.v-alert {
  margin-top: 15px;
}

/* Estilo para o ícone de fechar (X) */
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #000;
}
</style>
