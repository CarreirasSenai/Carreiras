<template>
  <v-container fluid class="signup-container fill-height">
    <v-row style="margin: 0" justify="center">
      <v-col cols="12" sm="9" md="10" lg="11">
        <div class="logo-container text-center">
          <img class="carreiras-logo" src="/src/assets/Logo_branco.png" alt="Logo do Carreiras" />
        </div>
        <v-card class="px-4 elevation-12 signup-card" rounded="xl">
          <v-card-text>
            <h1 class="text-center my-1">Cadastro</h1>
            <v-form class="my-4" @submit.prevent="enviarCadastro">
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-autocomplete label="Área de Atuação" v-model="area" :items="listaSegmentos"
                    variant="underlined"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-autocomplete label="Profissão ou Cargo Desejado" v-model="profissao" :items="listaProfissoes"
                    variant="underlined"></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="nomeSocial" :rules="nomeSocialRules" label="Nome Social" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="nomeCompleto" :rules="nomeCompletoRules" label="Nome Completo"
                    bg-color="#F7F7F7" density="compact"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="phone" :rules="phoneRules" v-mask="'(##) ####-####'" label="Telefone"
                    bg-color="#F7F7F7" density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="cellphone" :rules="cellphoneRules" v-mask="'(##) #####-####'" label="Celular"
                    bg-color="#F7F7F7" density="compact"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-mask="'###.###.###-##'" v-model="cpf" :rules="cpfRules" label="CPF" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="cep" :rules="confirmcepRules" label="CEP" bg-color="#F7F7F7" density="compact"
                    v-mask="'########'" @blur="retornarInformacoesCep"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="rua" :rules="ruaRules" label="Rua" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="numCasa" :rules="confirmnumeroRules" label="Nº" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="complemento" :rules="complementoRules" label="Complemento" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="bairro" :rules="bairroRules" label="Bairro" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3">
                  <v-text-field v-model="cidade" :rules="cidadeRules" label="Cidade" bg-color="#F7F7F7"
                    density="compact"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-select v-model="estado" :rules="estadoRules" :items="items" label="Estado" bg-color="#F7F7F7"
                    density="compact"></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[senhaRules.senhaRequired, senhaRules.senhaMin, senhaRules.senhaComplexa]"
                    :type="showPassword ? 'text' : 'password'" class="input-group--focused" label="Senha" name="senha"
                    counter density="compact" @click:append="showPassword = !showPassword">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4">
                  <v-text-field v-model="repSenha" :append-icon="showRePassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[
                    senhaRules.repSenhaRequired,
                    senhaRules.repSenhaMin,
                    senhaRules.confirmSenha,
                    senhaRules.senhaComplexa
                  ]" :type="showRePassword ? 'text' : 'password'" class="input-group--focused" label="Repetir senha"
                    name="rep-senha" counter density="compact" @click:append="showRePassword = !showRePassword">
                  </v-text-field>
                </v-col>
              </v-row>
              <div class="sign-in-buttons d-flex justify-center my-4">
                <v-btn lass="adm-btn" class="bg-purple-darken-4 me-2" @click="enviarCadastro">Cadastrar</v-btn>
              </div>
            </v-form>
            <div class="got-account-container my-3">
              <p>
                Já criou sua conta?
                <a href="/empresa-candidato?resposta=entrar">Faça o login aqui</a>
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Alerta PopUp -->
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
            <v-btn text="Entrar na Conta" @click="isActive.value = false" to="/login?resposta=candidato" class="bg-purple-darken-4">
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import listaProfissoes from '@/assets/profissoes.json';
import listaSegmentos from '@/assets/segmentos.json';

export default {
  data() {
    return {
      nomeSocial: "Thiago",
      nomeCompleto: "Thiag Lima",
      email: "thiago@gmail.com",
      phone: "4700000000",
      cellphone: "47000000000",
      cpf: "00000000000",
      cep: "00000000",
      confirmcep: "",
      rua: "Rua Bonita",
      numCasa: "00",
      complemento: "cabana",
      bairro: "Bairro Bonito",
      cidade: "Bonita",
      estado: "SC",
      showPassword: false,
      showRePassword: false,
      password: "12345678Ww@",
      repSenha: "12345678Ww@",
      area: null,
      profissao: null,
      resposta: false,
      mensagemErro: '',
      listaProfissoes: listaProfissoes,
      listaSegmentos: listaSegmentos,

      nomeSocialRules: [
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
      cellphoneRules: [
        (v) => !!v || "Celular requerido",
        (v) => v.length == 15 || "Celular deve ter pelo menos 15 caracteres",
      ],
      phoneRules: [
        (v) => !!v || "Telefone requerido",
        (v) => v.length == 14 || "Telefone deve ter pelo menos 14 caracteres",
      ],

      cpfRules: [
        (v) => !!v || "CPF Requerido",
        (v) => v.length === 14 || "CPF deve ter 14 caracteres",
      ],

      confirmcepRules: [
        (v) => !!v || "CEP Requerido",
        (v) => v.length === 8 || "CEP deve ter 8 caracteres",
        (v) => /^\d+$/.test(v) || "CEP deve conter apenas números",
      ],

      confirmnumeroRules: [
        (v) => !!v || "Nº Requerido",
        (v) => v.length >= 1 || "Nº deve ter pelo menos 1 caractere",
      ],

      complementoRules: [
        (v) => !!v || "Complemento Requerido",
        (v) => v.length >= 3 || "Complemento deve ter pelo menos 3 caracteres",
      ],

      ruaRules: [
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

      estadoRules: [(v) => !!v || "Estado Requerido"],
      senhaRules: {
        senhaRequired: (value) => !!value || "Senha requerida",
        repSenhaRequired: (value) => !!value || "Repetir senha requerida",
        senhaMin: (v) =>
          v.length >= 8 || "Senha deve ter pelo menos 8 caracteres",
        repSenhaMin: (v) =>
          v.length >= 8 || "Repetir senha deve ter pelo menos 8 caracteres",
        confirmSenha: (v) => v === this.password || "Senhas não coincidem",
        senhaComplexa: (v) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(v) ||
          "Senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial",
      },
      items: ['Selecionar', 'AC', 'AL', 'AP', 'AM', 'BA',
        'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB',
        'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP',
        'SE', 'TO'],
    };
  },
  methods: {
    async enviarCadastro() {
      this.cpf = this.limparMascaraValores(this.cpf);
      this.phone = this.limparMascaraValores(this.phone);
      this.cellphone = this.limparMascaraValores(this.cellphone);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/candidato/create`, {
          nomeSocial: this.nomeSocial,
          nomeCompleto: this.nomeCompleto,
          email: this.email,
          phone: this.phone,
          cellphone: this.cellphone,
          cpf: this.cpf,
          cep: this.cep,
          rua: this.rua,
          numCasa: this.numCasa,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado,
          password: this.password,
          profissao: this.profissao,
          area: this.area
        });

        this.resposta = true;
        console.log("Cadastro bem-sucedido", response.data);
        document.getElementById("btnAlertaCadastro").click();
      } catch (error) {
        this.resposta = false;
        console.error("Erro no cadastro", error.response.data.error);
        this.mensagemErro = error.response.data.error;
        document.getElementById("btnAlertaCadastro").click();
      }
    },
    limparMascaraValores(valor) {
      if (valor !== "") {
        valor = valor.replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "");
      }

      return valor;
    },
    async retornarInformacoesCep() {
      if (this.cep !== "" && this.cep.length === 8) {
        try {
          const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${this.cep}`)
          this.rua = response.data.street,
            this.bairro = response.data.neighborhood,
            this.cidade = response.data.city,
            this.estado = response.data.state
        }
        catch (error) {
          console.log("Houve um erro ao validar o CEP. Erro: ", error);
          alert("Erro ao processar o CEP. Envie um cep válido ou tente novamente.")
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.signup-container {
  background-color: #6832d2 !important;
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
  size: "large";
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