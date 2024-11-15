<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn variant="text" v-bind="activatorProps" icon="mdi-pencil"></v-btn>
      </template>

      <v-container>
        <v-form class="my-4" @submit.prevent="updateUser">
          <v-row no-gutters>
            <v-col cols="12">
              <v-card title="Editar Cadastro" class="pa-2">
                <v-card-text style="max-height: 70vh" class="overflow-auto">
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.razaoSocial" :rules="razaoSocialRules" label="Razão social"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.nomeFantasia" :rules="nomeFantasiaRules" label="Nome fantasia"
                        variant="underlined"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.email" :rules="emailRules" label="Email"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="form.telefone" :rules="telefoneRules" label="Telefone"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="form.celular" :rules="celularRules" label="Celular"
                        variant="underlined"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="form.cnpj" :rules="cnpjRules" label="CNPJ"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="form.inscricaoEstadual" :rules="inscricaoEstadualRules"
                        label="Inscrição estadual" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" lg="4">
                      <v-text-field v-model="form.cep" :rules="cepRules" label="CEP"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" lg="2">
                      <v-text-field v-model="form.numero" :rules="numeroRules" label="Nº"
                        variant="underlined"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.complemento" label="Complemento" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="form.endereco" :rules="enderecoRules" label="Endereço"
                        variant="underlined"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="form.bairro" :rules="bairroRules" label="Bairro"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="form.cidade" :rules="cidadeRules" label="Cidade"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-select v-model="form.estado" :rules="estadoRules" :items="items" label="Estado"
                        variant="underlined"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.responsavelLegal" :rules="responsavelLegalRules"
                        label="Responsável legal" variant="underlined"></v-text-field>
                    </v-col>
                     <v-text-field
                        v-model="form.cpfResponsavel"
                        :rules="cpfResponsavelRules"
                        v-mask="'###.###.###-##'"
                        label="CPF do responsável legal"
                        variant="underlined"
                      ></v-text-field>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.contatoRA" :rules="contatoRARules" label="Contato RA"
                        variant="underlined"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-radio-group v-model="form.verificado" :rules="geral" label="Status Ativo" inline>
                        <v-radio label="Ativado" value="1"></v-radio>
                        <v-radio label="Desativado" value="0"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn to="/redefinir-senha?resposta=empresa" text="Redefinir Senha"
                        append-icon="mdi-arrow-top-right-thick" block></v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn text="Excluir" variant="text" @click="dialog = false, modalDelete = true"></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
                  <v-btn text="Salvar" color="Enviar" variant="tonal" class="bg-purple-darken-4" type="submit"></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-dialog>
    <div>
      <v-dialog max-width="500" v-model="modalDelete">
        <v-card title="Confirme a Exclusão da Empresa">
          <v-card-text>
            Tem certeza que deseja excluir essa empresa? Todos os dados da empresa serão apagados e não será possível
            recuperá-los!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" text="Cancelar" @click="modalDelete = false"></v-btn>
            <v-btn variant="tonal" class="bg-error" text="Excluir Empresa" @click="deletarEmpresa"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCandidatoStore } from "@/stores/candidato";
export default {
  data() {
    return {
      form: {
        razaoSocial: "",
        nomeFantasia: "",
        email: "",
        telefone: "",
        celular: "",
        cnpj: "",
        inscricaoEstadual: "",
        cep: "",
        numero: "",
        complemento: "",
        endereco: "",
        bairro: "",
        cidade: "",
        estado: "",
        responsavelLegal: "",
        contatoRA: "",
        cpfResponsavel: "",
        verificado: ""
      },
      responsavelAdm: "",
      modalDelete: false,
      razaoSocialRules: [(v) => !!v || "Razão social requerida"],
      nomeFantasiaRules: [(v) => !!v || "Nome fantasia requerido"],
      emailRules: [
        (v) => !!v || "E-mail requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
        (v) => v.length <= 254 || "E-mail deve ter no máximo 254 caracteres",
      ],
      telefoneRules: [
        (v) => !!v || "Telefone requerido",
        (v) => v.length >= 10 || "Telefone deve ter pelo menos 10 caracteres",
      ],
      celularRules: [
        (v) => !!v || "Celular requerido",
        (v) => v.length >= 10 || "Celular deve ter pelo menos 10 caracteres",
      ],
      cnpjRules: [
        (v) => !!v || "CNPJ requerido",
        (v) => /^\d+$/.test(v) || "CNPJ deve conter apenas números",
      ],
      inscricaoEstadualRules: [(v) => !!v || "Inscrição estadual requerida"],
      cepRules: [
        (v) => !!v || "CEP requerido",
        (v) => v.length === 8 || "CEP deve ter 8 caracteres",
        (v) => /^\d+$/.test(v) || "CEP deve conter apenas números",
      ],
      numeroRules: [
        (v) => !!v || "Número requerido",
        (v) => v.length >= 1 || "Nº Casa deve ter pelo menos 1 caractere",
      ],
      enderecoRules: [
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
      estadoRules: [(v) => !!v || "Estado requerido"],
      responsavelLegalRules: [(v) => !!v || "Responsável legal requerido"],
      responsavelAdmRules: [
        (v) => !!v || "Responsável administrativo requerido",
      ],
      cpfResponsavelRules: [(v) => !!v || "CPF Requerido",
        (v) => v.length === 14 || "CPF deve ter 14 caracteres",],
      contatoRARules: [
        (v) => !!v || "Contato do Responsável administrativo requerido",
      ],
      senhaRules: [(v) => !!v || "Senha requerida"],
      repSenhaRules: [(v) => !!v || "Repetir senha requerido"],
      items: ['Selecionar', 'AC', 'AL', 'AP', 'AM', 'BA',
        'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB',
        'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP',
        'SE', 'TO'],
      geral: [
        (v) => !!v || "Escolha uma opção",
      ],
      dialog: false,
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
    usuarios() {
      return useCandidatoStore();
    }
  },
  methods: {
    async updateUser(event) {
      console.clear();
      console.log("Passou no update")
      const dados = await event;

      if (dados.valid === true) {
        this.form.cpfResponsavel = this.limparMascaraValores(this.form.cpfResponsavel);
        try {
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/empresa/update`, {
            dados: this.form,
          }, { withCredentials: true });

          console.log("Resposta: ", response.data);
          this.MostrarUsuarios();
          this.dialog = false;
        } catch (error) {
          console.error('Erro', error.response.data);
          this.mensagem = error.response.data.error;
        }
      }
      this.mensagem = "Preencha todos os campos";
      console.log("Mensagem: ", this.mensagem);
    },
    async deletarEmpresa() {
      console.clear();
      console.log("Id da empresa: ", this.User.id);

      try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/empresa/delete`, {
          data: { id: this.form.id },
          withCredentials: true,
        });

        console.log(response.data);
        this.MostrarUsuarios();
        this.modalDelete = false;

      } catch (error) {
        console.error('Erro', error.response.data);
        this.mensagem = error.response.data.error;
      }
    },
    limparMascaraValores(valor) {
      if (typeof valor === 'string' && valor !== '') {
        valor = valor.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "");
      } else if (valor !== null) {
        valor = String(valor).replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "");
      }

      return valor;
    }
  },
  mounted() {
      this.form.id = this.User.id,
      this.form.razaoSocial = this.User.razao_social,
      this.form.nomeFantasia = this.User.nome_fantasia,
      this.form.email = this.User.email,
      this.form.telefone = this.User.telefone,
      this.form.celular = this.User.celular,
      this.form.cnpj = this.User.cnpj,
      this.form.inscricaoEstadual = this.User.inscricao_estadual,
      this.form.cep = this.User.cep,
      this.form.numero = this.User.numero,
      this.form.complemento = this.User.complemento,
      this.form.endereco = this.User.endereco,
      this.form.bairro = this.User.bairro,
      this.form.cidade = this.User.cidade,
      this.form.estado = this.User.estado,
      this.form.responsavelLegal = this.User.responsavel_legal,
      this.form.cpfResponsavel = this.User.cpf_responsavel,
      this.form.contatoRA = this.User.contato_responsavel,
      this.form.verificado = this.User.verificado.toString()
  }
};
</script>