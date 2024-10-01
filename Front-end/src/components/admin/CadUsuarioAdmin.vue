<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="bg-deep-purple-accent-3" v-bind="activatorProps">
        Adicionar
      </v-btn>
    </template>

    <v-form class="my-4" @submit.prevent="createUser">
      <v-card title="Cadastrar Usuário">
        <small class="text-error position-absolute top-0 right-0 ma-4 mr-6">{{ mensagem }}</small>
        <v-card-text style="max-height: 70vh" class="overflow-auto">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.nome" :rules="nomeRules" label="Nome Completo"
                variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" variant="underlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.cpf" :rules="cpfRules" label="CPF" variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.celular" :rules="cellphoneRules" label="Celular"
                variant="underlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.senha" :rules="passwordRules" label="Senha" variant="underlined"
                type="password"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="senhaConfirm" :rules="confirmPasswordRules" label="Repetir Senha"
                variant="underlined" type="password"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-radio-group v-model="form.tipo" :rules="geral" label="Classe do Usuário">
                <v-radio label="SUPER" value="super"></v-radio>
                <v-radio label="ADM" value="adm"></v-radio>
                <v-radio label="USER" value="user"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6">
              <v-radio-group v-model="form.status" :rules="geral" label="Status Ativo">
                <v-radio label="Ativado" value="1"></v-radio>
                <v-radio label="Desativado" value="0"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end">
          <v-spacer></v-spacer>
          <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
          <v-btn text="Salvar" color="Enviar" variant="tonal" class="bg-purple-darken-4" type="submit"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      mensagem: '',
      form: {
        nome: 'Thiago Mau',
        email: 'mauesckt@gmail.com',
        cpf: '11111111111',
        senha: 'Thiago1@',
        celular: '11111111111',
        tipo: 'adm',
        status: '1'
      },
      senhaConfirm: 'Thiago1@',

      nomeRules: [
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
      cpfRules: [
        (v) => !!v || "Cpf requerido",
        (v) => v.length === 11 || "Celular deve ter pelo menos 10 caracteres",
        (v) => /^\d+$/.test(v) || "Celular deve conter apenas números",
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
        (v) => v === this.form.senha || "Senhas não coincidem",
      ],
      geral: [
        (v) => !!v || "Escolha uma opção",
      ]
    };
  },
  methods: {
    async createUser(event) {
      console.clear();
      const dados = await event;

      // alert(JSON.stringify(dados, null, 2))

      if (dados.valid === true) {
        console.log(this.form);

        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/create`, {
            dados: this.form,
          }, { withCredentials: true });

          console.log(response.data);
          this.dialog = false;

        } catch (error) {
          console.error('Erro', error.response.data);
          this.mensagem = error.response.data.error;
        }
      }
    }
  },
};
</script>