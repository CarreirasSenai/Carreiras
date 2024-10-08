<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ props: activatorProps }">
       <v-btn variant="text" v-bind="activatorProps" icon="mdi-pencil"></v-btn>
      </template>

      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-card title="Editar Cadastro" class="pa-2">
              <v-card-text style="max-height: 70vh" class="overflow-auto">
                <v-form class="my-4" @submit.prevent="updateUser">
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field
                        v-model="razaoSocial"
                        :rules="razaoSocialRules"
                        label="Razão social"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field
                        v-model="nomeFantasia"
                        :rules="nomeFantasiaRules"
                        label="Nome fantasia"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field
                        v-model="telefone"
                        :rules="telefoneRules"
                        label="Telefone"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field
                        v-model="celular"
                        :rules="celularRules"
                        label="Celular"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field
                        v-model="cnpj"
                        :rules="cnpjRules"
                        label="CNPJ"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field
                        v-model="inscricaoEstadual"
                        :rules="inscricaoEstadualRules"
                        label="Inscrição estadual"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" lg="4">
                      <v-text-field
                        v-model="cep"
                        :rules="cepRules"
                        label="CEP"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" lg="2">
                      <v-text-field
                        v-model="numero"
                        :rules="numeroRules"
                        label="Nº"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field
                        v-model="complemento"
                        label="Complemento"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="endereco"
                        :rules="enderecoRules"
                        label="Endereço"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field
                        v-model="bairro"
                        :rules="bairroRules"
                        label="Bairro"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field
                        v-model="cidade"
                        :rules="cidadeRules"
                        label="Cidade"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-select
                        v-model="estado"
                        :rules="estadoRules"
                        :items="items"
                        label="Estado"
                        variant="underlined"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field
                        v-model="responsavelLegal"
                        :rules="responsavelLegalRules"
                        label="Responsável legal"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field
                        v-model="responsavelAdm"
                        :rules="responsavelAdmRules"
                        label="Responsável administrativo (RA)"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field
                        v-model="contatoRA"
                        :rules="contatoRARules"
                        label="Contato RA"
                        variant="underlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-radio-group v-model="status" :rules="geral" label="Status Ativo" inline>
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
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  text="Excluir"
                  variant="text"
                  @click="dialog = false, modalDelete = true"
                ></v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  text="Fechar"
                  variant="outlined"
                  @click="dialog = false"
                ></v-btn>
                <v-btn
                  text="Salvar"
                  color="Enviar"
                  variant="tonal"
                  class="bg-purple-darken-4"
                  type="submit"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
      responsavelAdm: "",
      contatoRA: "",
      status: "",
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
      const dados = await event;

      if (dados.valid === true) {
        console.log(this.form);

        try {
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/update`, {
            dados: this.form,
          }, { withCredentials: true });

          console.log(response.data);
          this.MostrarUsuarios();
          this.dialog = false;

        } catch (error) {
          console.error('Erro', error.response.data);
          this.mensagem = error.response.data.error;
        }
      }
    },
    async deletarEmpresa() {
      console.clear();
      console.log("Id da empresa: ", this.User.id);

      try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/empresa/delete`, {
          data: { id: this.User.id },
          withCredentials: true,
        });

        console.log(response.data);
        this.MostrarUsuarios();
        this.modalDelete = false;

      } catch (error) {
        console.error('Erro', error.response.data);
        this.mensagem = error.response.data.error;
      }
    }
  },
  mounted() {
    this.id = this.User.id,
    this.razaoSocial = this.User.razao_social,
    this.nomeFantasia = this.User.nome_fantasia,
    this.email = this.User.email,
    this.telefone = this.User.telefone,
    this.celular = this.User.celular,
    this.cnpj = this.User.cnpj,
    this.inscricaoEstadual = this.User.inscricao_estadual,
    this.cep = this.User.cep,
    this.numero = this.User.numero,
    this.complemento = this.User.complemento,
    this.endereco = this.User.endereco,
    this.bairro = this.User.bairro,
    this.cidade = this.User.cidade,
    this.estado = this.User.estado,
    this.responsavelLegal = this.User.responsavel_legal,
    this.cpf_responsavel = this.User.cpf_responsavel,
    this.contatoRA = this.User.contato_responsavel,
    this.status = this.User.verificado.toString()
  }
};
</script>