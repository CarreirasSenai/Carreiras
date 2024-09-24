<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            variant="text"
            v-bind="activatorProps"
            class="w-100 rounded-0 justify-start"
            >Editar Cadastro</v-btn
          >
        </template>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12">
              <v-card title="Editar Cadastro" class="pa-2">
                <v-card-text style="max-height: 70vh" class="overflow-auto">
                  <v-form class="my-4" @submit.prevent>
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
                          v-mask="'(##) ####-####'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" md="3" lg="3">
                        <v-text-field
                          v-model="celular"
                          :rules="celularRules"
                          label="Celular"
                          variant="underlined"
                          v-mask="'(##) #####-####'"
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
                          v-mask="'##.###.###/####-##'"
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
                          v-mask="'########'"
                          maxlength="8"
                          v-model="cep"
                          :rules="cepRules"
                          label="CEP"
                          variant="underlined"
                          @blur="retornarInformacoesCep"
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
                      <v-col cols="12" sm="4" md="4" lg="4">
                        <v-text-field
                          v-model="responsavelLegal"
                          :rules="responsavelLegalRules"
                          label="Responsável legal"
                          variant="underlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" lg="4">
                        <v-text-field
                          v-model="cpfResponsavel"
                          :rules="cpfResponsavelRules"
                          v-mask="'###.###.###-##'"
                          label="CPF do responsável legal"
                          variant="underlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" lg="4">
                        <v-text-field
                          v-model="responsavelAdm"
                          :rules="responsavelAdmRules"
                          label="Responsável administrativo (RA)"
                          variant="underlined"
                          counter
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" lg="6">
                        <v-btn to="/redefinir-senha?resposta=empresa" text="Redefinir Senha"
                          append-icon="mdi-arrow-top-right-thick" block></v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text="Fechar"
                    variant="outlined"
                    @click="dialog = false"
                  ></v-btn>
                  <v-btn
                    text="Atualizar"
                    variant="tonal"
                    @click="dialog = false"
                    class="bg-purple-darken-4"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>
    </div>
    <v-snackbar :color="color" v-model="snackbar" :timeout="6000">
      <div class="text-center">{{ mensagem }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      razaoSocial: '',
      nomeFantasia: '',
      email: '',
      telefone: '',
      celular: '',
      cnpj: '',
      inscricaoEstadual: '',
      cep: '',
      numero: '',
      complemento: '',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
      responsavelLegal: '',
      cpfResponsavel: '',
      responsavelAdm: '',
      contatoRA: '',
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
      cpfResponsavelRules: [(v) => !!v || "CPF Requerido",
        (v) => v.length === 14 || "CPF deve ter 14 caracteres",],
      responsavelAdmRules: [
        (v) => !!v || "Responsável administrativo requerido",
      ],
      items: ['Selecionar', 'AC', 'AL', 'AP', 'AM', 'BA',
                'CE', 'DF', 'ES', 'GO', 'MA',
                'MT', 'MS', 'MG', 'PA', 'PB',
                'PR', 'PE', 'PI', 'RJ', 'RN',
                'RS', 'RO', 'RR', 'SC', 'SP',
                'SE', 'TO'],
      dialog: false,
    };
  },
  methods: {
    async retornarInformacoesCep(){
      if(this.cep !== "" && this.cep.length === 8) {
        try {
          const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${this.cep}`)
          this.endereco = response.data.street,
          this.bairro = response.data.neighborhood,
          this.cidade = response.data.city,
          this.estado = response.data.state
        }
        catch (error) {
          console.log("Houve um erro ao validar o CEP. Erro: ", error);
          alert("Erro ao processar o CEP. Envie um cep válido ou tente novamente.")
        }
      }
    },
    async atualizarCadastro(){
      console.clear();
      this.cnpj = this.limparMascaraValores(this.cnpj);
      this.cpfResponsavel = this.limparMascaraValores(this.cpfResponsavel);
      try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/empresa/update`, {
          id: this.id,
          razaoSocial: this.razaoSocial,
          nomeFantasia: this.nomeFantasia,
          email: this.email,
          telefone: this.telefone,
          celular: this.celular,
          cnpj: this.cnpj,
          inscricaoEstadual: this.inscricaoEstadual,
          cep: this.cep,
          numero: this.numero,
          complemento: this.complemento,
          endereco: this.endereco,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado,
          responsavelLegal: this.responsavelLegal,
          cpfResponsavel: this.cpfResponsavel,
          responsavelAdm: this.responsavelAdm
        })
      } catch (error) {
        this.mensagem = 'Erro na atualização do Cadastro!';
        this.color = 'error';
        this.snackbar = true;
        console.error('Erro ao atualizar o cadastro', error.response.data);
      }
    },
    limparMascaraValores(valor) {
      if (valor !== "") {
        valor = valor.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "");
      }

      return valor;
    }
  }
};
</script>