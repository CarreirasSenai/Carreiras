<template>
  <v-container fluid class="signup-container fill-height">
    <v-row style="margin: 0;" justify="center" align="center">
      <v-col cols="12" sm="9" md="10" lg="11">
        <div class="logo-container text-center">
          <img class="carreiras-logo" src="/src/assets/Logo_branco.png" alt="Logo do Carreiras">
        </div>
        <v-card class="px-4 elevation-12 signup-card" rounded="xl">
          <v-card-text>
            <h1 class="text-center my-1">Cadastro</h1>
            <v-form ref="form" v-model="isValid" class="my-4" @submit.prevent>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field
                    v-model="razaoSocial"
                    :rules="razaoSocialRules"
                    label="Razão social"
                    bg-color="#F7F7F7"
                    density="compact"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field
                    v-model="nomeFantasia"
                    :rules="nomeFantasiaRules"
                    label="Nome fantasia"
                    bg-color="#F7F7F7"
                    density="compact"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Email"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                    <v-text-field
                      v-mask="'(##) ####-####'"
                      v-model="telefone"
                      :rules="telefoneRules"
                      label="Telefone"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3" md="3" lg="3">
                    <v-text-field
                      v-mask="'(##) #####-####'"
                      v-model="celular"
                      :rules="celularRules"
                      label="Celular"
                      bg-color="#F7F7F7"
                      density="compact"
                    ></v-text-field>
                  </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3" md="3" lg="3">
                   <v-text-field
                      v-mask="'##.###.###/####-##'"
                      maxlength="18"
                      v-model="cnpj"
                      :rules="cnpjRules"
                      label="CNPJ"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                   ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                   <v-text-field
                      v-mask="'###.###.###.###'"
                      v-model="inscricaoEstadual"
                      :rules="inscricaoEstadualRules"
                      label="Inscrição estadual"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                   <v-text-field
                      v-mask="'########'"
                      maxlength="8"
                      v-model="cep"
                      :rules="cepRules"
                      label="CEP"
                      bg-color="#F7F7F7"
                      density="compact"
                      @blur="retornarInformacoesCep"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2" lg="2">
                   <v-text-field
                      v-model="numero"
                      :rules="numeroRules"
                      label="Nº"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                   <v-text-field
                      v-model="complemento"
                      label="Complemento"
                      bg-color="#F7F7F7"
                      density="compact"
                    ></v-text-field>
                </v-col>
                <v-col>
                   <v-text-field
                      v-model="endereco"
                      :rules="enderecoRules"
                      label="Endereço"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3" md="3" lg="3">
                   <v-text-field
                      v-model="bairro"
                      :rules="bairroRules"
                      label="Bairro"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                   <v-text-field
                      v-model="cidade"
                      :rules="cidadeRules"
                      label="Cidade"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                   <v-select
                    v-model="estado"
                    :rules="estadoRules"
                    :items="items"
                    label="Estado"
                    bg-color="#F7F7F7"
                    density="compact"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                    <v-text-field
                      v-model="responsavelLegal"
                      :rules="responsavelLegalRules"
                      label="Responsável legal"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                    <v-text-field
                      v-model="cpfResponsavel"
                      :rules="cpfResponsavelRules"
                      v-mask="'###.###.###-##'"
                      label="CPF do responsável legal"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="11" sm="4" md="4" lg="4">
                    <v-text-field
                      v-model="contatoRA"
                      :rules="emailRules"
                      label="Contato RA"
                      bg-color="#F7F7F7"
                      density="compact"
                      required
                    ></v-text-field>
                </v-col>
                <v-col cols="11" sm="6" md="6" lg="6">
                  <v-text-field
                     v-model="senha"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[senhaRules.senhaRequired, senhaRules.senhaMin, senhaRules.senhaComplexa]"
                    :type="showPassword ? 'text' : 'password'"
                    class="input-group--focused"
                    label="Senha"
                    name="senha"
                    counter
                    @click:append="showPassword = !showPassword"
                    density="compact"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="11" sm="6" md="6" lg="6">
                  <v-text-field
                    v-model="repSenha"
                    :append-icon="showRePassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[senhaRules.repSenhaRequired, senhaRules.repSenhaMin, senhaRules.confirmSenha]"
                    :type="showRePassword ? 'text' : 'password'"
                    class="input-group--focused"
                    label="Repetir senha"
                    name="rep-senha"
                    counter
                    density="compact"
                    @click:append="showRePassword = !showRePassword"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="sign-in-buttons d-flex justify-center my-4">
                <v-btn :disabled="!isValid" class="adm-button bg-purple-darken-4 mt-4 mb-2" size="large" @click="enviarCadastro()">Salvar</v-btn>
              </div>
            </v-form>
            <div class="got-account-container my-3">
              <p>Já criou sua conta? <a href="/empresa-candidato?resposta=entrar">Faça o login aqui</a></p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Modal sucesso -->
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
            Cadastro realizado com sucesso! <br> <br> Enviamos um link de verificação no seu e-mail.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Fechar" @click="isActive.value = false"></v-btn>
            <v-btn text="Entrar na Conta" @click="isActive.value = false" to="/login?resposta=empresa" class="bg-purple-darken-4">
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isValid: false,
      razaoSocial: 'InfoTech S.A.',
      nomeFantasia: 'InfoTech',
      email: 'seuemail@gmail.com',
      telefone: '4780614657',
      celular: '47997213589',
      cnpj: '20117741000164',
      inscricaoEstadual: '283759312284',
      cep: '76801974',
      numero: '50',
      complemento: 'Casa',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
      responsavelLegal: 'Fulano da Silva',
      cpfResponsavel: '90035392002',
      contatoRA: 'ciclano_santos@infotech.com.br',
      senha: '12345678Ww@',
      repSenha: '12345678Ww@',
      resposta: false,
      mensagemErro: '',
      showPassword: false,
      showRePassword: false,
      senhaRules: {
          senhaRequired: value => !!value || 'Senha requerida',
          repSenhaRequired: value => !!value || 'Repetir senha requerida',
          senhaMin: v => v.length >= 8 || 'Senha deve ter pelo menos 8 caracteres',
          repSenhaMin: v => v.length >= 8 || 'Repetir senha deve ter pelo menos 8 caracteres',
          confirmSenha: (v) => v === this.senha && v.length === this.senha.length || "Senhas não coincidem",
          senhaComplexa: (v) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(v) ||
          "Senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial",
      },
      razaoSocialRules: [(v) => !!v || 'Razão social requerida'],
      nomeFantasiaRules: [(v) => !!v || 'Nome fantasia requerido'],
      emailRules: [(v) => !!v || 'E-mail requerido',
        (v) => /.+@.+\..+/.test(v) || 'E-mail precisa ser válido',
        (v) => v.length <= 254 || "E-mail deve ter no máximo 254 caracteres"],
      telefoneRules: [(v) => !!v || 'Telefone requerido',
        (v) => v.length == 14 || "Telefone deve ter pelo menos 14 caracteres"],
      celularRules: [(v) => !!v || 'Celular requerido',
        (v) => v.length == 15 || "Celular deve ter pelo menos 15 caracteres"],
      cnpjRules: [(v) => !!v || 'CNPJ requerido'],
      inscricaoEstadualRules: [(v) => !!v || 'Inscrição estadual requerida'],
      cepRules: [(v) => !!v || 'CEP requerido',
        (v) => v.length === 8 || "CEP deve ter 8 caracteres"],
      numeroRules: [(v) => !!v || 'Número requerido', 
      (v) => v.length >= 1 || "Nº Casa deve ter pelo menos 1 caractere",],
      enderecoRules: [(v) => !!v || "Endereço Requerido",
        (v) => v.length >= 5 || "Endereço deve ter pelo menos 5 caracteres",
      ],
      bairroRules: [(v) => !!v || "Bairro Requerido",
        (v) => v.length >= 3 || "Bairro deve ter pelo menos 3 caracteres",
      ],
      cidadeRules: [(v) => !!v || "Cidade Requerida",
        (v) => v.length >= 3 || "Cidade deve ter pelo menos 3 caracteres",
      ],
      estadoRules: [(v) => !!v || 'Estado requerido'],
      responsavelLegalRules: [(v) => !!v || 'Responsável legal requerido'],
      cpfResponsavelRules: [
        (v) => !!v || "CPF Requerido",
        (v) => v.length === 14 || "CPF deve ter 14 caracteres",
      ],
      items: ['Selecionar', 'AC', 'AL', 'AP', 'AM', 'BA',
                'CE', 'DF', 'ES', 'GO', 'MA',
                'MT', 'MS', 'MG', 'PA', 'PB',
                'PR', 'PE', 'PI', 'RJ', 'RN',
                'RS', 'RO', 'RR', 'SC', 'SP',
                'SE', 'TO'],
    };
  },
  methods: {
    async enviarCadastro(){
      if(this.$refs.form.validate()) {
        this.cnpj = this.limparMascaraValores(this.cnpj);
        this.celular = this.limparMascaraValores(this.celular);
        this.telefone = this.limparMascaraValores(this.telefone);
        this.inscricaoEstadual = this.limparMascaraValores(this.inscricaoEstadual);
        this.cpfResponsavel = this.limparMascaraValores(this.cpfResponsavel);
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/empresa/create`,
            {
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
              contatoRA: this.contatoRA,
              senha: this.senha
            }
          );
  
          this.resposta = true;
          console.log("Cadastro bem sucedido!", response.data);
          document.getElementById("btnAlertaCadastro").click();
        } catch(error) {
          this.resposta = false;
          console.error("Erro no cadastro", error.response.data.error);
          this.mensagemErro = error.response.data.error;
          document.getElementById("btnAlertaCadastro").click();
        }
      } else {
        alert("Preencha os campos obrigatórios!")
      }
    },
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
    limparMascaraValores(valor) {
      if (valor !== "") {
        valor = valor.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "");
      }

      return valor;
    }
  }
};
</script>

<style lang="scss" scoped>
.signup-container {
  background-color: #6832D2 !important;
  height: 100% !important;
}

.signup-card {
  margin: 0 auto; 
  width: auto; 
  max-width: 1200px;
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
  height: auto;
  width: 210px;
  margin: 0 10px;
}

.sign-in-buttons {
  margin-top: 20px;
}

.adm-btn {
  border: thin solid #3a1c76 !important;
  color: #3a1c76 !important;
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