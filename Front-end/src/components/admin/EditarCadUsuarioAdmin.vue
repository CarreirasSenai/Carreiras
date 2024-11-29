<template>
  <div>
    <v-dialog v-model="dialog" max-width="600" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn variant="text" v-bind="activatorProps" icon="mdi-pencil"></v-btn>
      </template>
      <v-form class="my-4" @submit.prevent="updateUser">
        <v-card title="Editar Cadastro">
          <v-card-text style="max-height: 70vh" class="overflow-auto">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.nome" :rules="nomeRules" label="Nome Completo"
                  variant="underlined"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.email" :rules="emailRules" label="E-mail"
                  variant="underlined"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.cpf" :rules="cpfRules" label="CPF" variant="underlined"
                  v-mask="'###.###.###-##'" :disabled="true"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.celular" :rules="cellphoneRules" label="Celular" variant="underlined"
                  v-mask="'(##) #####-####'"></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="usuario.dadosUser.tipo_admin === 'super'">
              <v-col cols="12" md="6" v-if="this.User.grupo === 'admin'">
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
            <v-row>
              <v-col cols="12">
                <v-btn to="/redefinir-senha?resposta=admin" text="Redefinir Senha"
                  append-icon="mdi-arrow-top-right-thick" block></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-end">
            <v-btn v-if="usuario.dadosUser.tipo_admin === 'super'" text="Excluir" color="error"
              @click="modalDelete = true"></v-btn>
            <v-spacer></v-spacer>
            <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
            <v-btn text="Salvar" color="Enviar" variant="tonal" class="bg-purple-darken-4" type="submit"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog max-width="500" v-model="modalDelete">
      <v-card title="Confirme a Operação">
        <v-card-text>
          Tem certeza que deseja excluir este Usuário?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="tonal" text="Cancelar" @click="modalDelete = false"></v-btn>
          <v-btn variant="tonal" class="bg-error" text="Excluir" @click="deletarConta"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar :color="color" v-model="snackbar">
      <div class="text-center">{{ mensagem }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import { useCandidatoStore } from "@/stores/candidato";

export default {
  data() {
    return {
      dialog: false,
      modalDelete: false,
      mensagem: '',
      color: '',
      snackbar: false,
      form: {
        id: '',
        nome: '',
        email: '',
        cpf: '',
        celular: '',
        tipo: '',
        status: ''
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
        (v) => v.length >= 14 || "Cpf deve ter pelo menos 14 caracteres"
      ],
      cellphoneRules: [
        (v) => !!v || "Celular requerido",
        (v) => v.length >= 15 || "Celular deve ter pelo menos 15 caracteres",
        (v) => !/^(\d)\1+$/.test(v.replace(/\D/g, '')) || "Informe um celular válido"
      ],
      phoneRules: [
        (v) => !!v || "Telefone requerido",
        (v) => v.length >= 14 || "Telefone deve ter pelo menos 14 caracteres",
        (v) => !/^(\d)\1+$/.test(v.replace(/\D/g, '')) || "Informe um celular válido"
      ],
      geral: [
        (v) => !!v || "Escolha uma opção",
      ]
    };
  },

  props: {
    MostrarUsuarios: {
      type: Function,
      required: true
    },
    User: {
      type: Object,
      required: true
    }
  },

  computed: {
    usuario() {
      return useCandidatoStore();
    }
  },

  mounted() {
    this.form.id = this.User.id;
    if (this.User.nome != null && this.User.nome != undefined)
      this.form.nome = this.User.nome;
    else if (this.User.nome_completo != null && this.User.nome_completo != undefined)
      this.form.nome = this.User.nome_completo;
    this.form.email = this.User.email;
    this.form.cpf = this.User.cpf;
    this.form.celular = this.User.celular;
    this.form.tipo = this.User.tipo_admin;
    if (this.User.status != null && this.User.status != undefined && this.User.grupo === 'admin')
      this.form.status = this.User.status.toString();
    else if (this.User.verificado != null && this.User.verificado != undefined && this.User.grupo === 'candidato')
      this.form.status = this.User.verificado.toString();
  },

  methods: {
    async updateUser(event) {
      console.clear();
      const dados = await event;

      // alert(JSON.stringify(dados, null, 2))

      if (dados.valid === true) {
        console.log(this.form);
        this.form.cpf = this.limparMascaraValores(this.form.cpf);
        this.form.celular = this.limparMascaraValores(this.form.celular);
        try {
          let response = '';
          if (this.User.grupo === 'admin') {
            response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/update`, {
              dados: this.form,
            }, { withCredentials: true });
          } else if (this.User.grupo === 'candidato') {
            response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/candidato/update`, {
              id: this.User.id,
              nomeSocial: this.User.nome_social,
              nomeCompleto: this.form.nome,
              email: this.form.email,
              phone: this.User.telefone,
              cellphone: this.form.celular,
              cpf: this.form.cpf,
              cep: this.User.cep,
              rua: this.User.rua,
              numCasa: this.User.numero,
              complemento: this.User.complemento,
              bairro: this.User.bairro,
              cidade: this.User.cidade,
              estado: this.User.estado,
              profissao: this.User.profissao,
              verificado: this.form.status,
              area: this.User.area
            }, { withCredentials: true });
          }

          this.mensagem = response.data.success;
          this.snackbar = true;
          this.color = 'success';
          setTimeout(() => {
            this.MostrarUsuarios();
            this.dialog = false;
          }, 1500)

        } catch (error) {
          this.mensagem = error.response.data.error;
          this.snackbar = true;
          this.color = 'error';
        }
      }
    },

    async deletarConta() {
      console.clear();
      console.log(this.User.id);
      try {
        let response = '';
        if (this.User.grupo === 'admin') {
          response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/delete/${this.User.id}`,
            {
              withCredentials: true,
            });
        } else if (this.User.grupo === 'candidato') {
          response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/candidato/delete/`,
            {
              data: { id: this.User.id },
              withCredentials: true
            });
        }

        console.log(response.data);
        this.MostrarUsuarios();
        this.modalDelete = false;

      } catch (error) {
        console.error('Erro', error.response.data);
        this.mensagem = error.response.data.error;
      }
    },
    limparMascaraValores(valor) {
      console.log("VALOR MÁSCARA:", valor)
      if (typeof valor === 'string' && valor !== '') {
        valor = valor.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "");
      } else if (valor !== null) {
        valor = String(valor).replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "");
      }

      return valor;
    }
  },
};
</script>