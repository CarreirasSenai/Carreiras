<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn variant="text" v-bind="activatorProps" class="w-100 rounded-0 justify-start">Editar Cadastro</v-btn>
      </template>

      <v-container>
        <v-row>
          <v-col cols="12">
            <v-form class="my-4" @submit.prevent="atualizarCadastro">
              <v-card title="Informações Pessoais" class="pa-2">
                <v-card-text style="max-height: 70vh" class="overflow-auto">
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
                      <v-text-field v-model="nomeSocial" :rules="nomeSocialRules" label="Nome Social"
                        variant="underlined" :disabled="isDisabled"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="nomeCompleto" :rules="nomeCompletoRules" label="Nome Completo"
                        variant="underlined" :disabled="isDisabled"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="email" :rules="emailRules" label="E-mail" variant="underlined"
                        :disabled="isDisabled"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="phone" :rules="phoneRules" label="Telefone" variant="underlined"
                        :disabled="isDisabled" v-mask="'(##) ####-####'"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="cellphone" :rules="cellphoneRules" label="Celular" variant="underlined"
                        :disabled="isDisabled" v-mask="'(##) #####-####'"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="cpf" :rules="cpfRules" label="CPF" variant="underlined"
                        :disabled="isDisabled" v-mask="'###.###.###-##'"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="cep" :rules="confirmcepRules" label="CEP" variant="underlined"
                        :disabled="isDisabled" v-mask="'########'" @blur="retornarInformacoesCep"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="rua" :rules="ruaRules" label="Rua" variant="underlined"
                        :disabled="isDisabled"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="numCasa" :rules="confirmnumeroRules" label="Nº" variant="underlined"
                        :disabled="isDisabled"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="complemento" :rules="complementoRules" label="Complemento"
                        variant="underlined" :disabled="isDisabled"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="bairro" :rules="bairroRules" label="Bairro" variant="underlined"
                        :disabled="isDisabled"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="cidade" :rules="cidadeRules" label="Cidade" variant="underlined"
                        :disabled="isDisabled"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-select v-model="estado" :rules="estadoRules" :items="items" label="Estado" variant="underlined"
                        :disabled="isDisabled"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-btn to="/redefinir-senha?resposta=candidato" text="Redefinir Senha"
                        append-icon="mdi-arrow-top-right-thick" block></v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn text="Excluir" variant="text" @click="dialog = false, modalDelete = true"></v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
                  <v-btn text="Atualizar" color="Enviar" variant="tonal" class="bg-purple-darken-4"
                    @click="atualizarCadastro"></v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>

  <v-dialog max-width="500" v-model="modalDelete">
    <v-card title="Confirme a Exclusão da Conta">
      <v-card-text>
        Tem certeza que deseja excluir sua conta? Todos os seus dados serão apagados e não será possível
        recuperá-los!
        <!-- Melhoria: Sistema de feedbacks dos users -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" text="Cancelar" @click="modalDelete = false"></v-btn>
        <v-btn variant="tonal" class="bg-error" text="Excluir Conta" @click="deletarConta"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar :color="color" v-model="snackbar" :timeout="6000">
    <div class="text-center">{{ mensagem }}</div>
  </v-snackbar>
</template>

<script>
import axios from 'axios';
import { useCandidatoStore } from '@/stores/candidato';
import listaProfissoes from '@/assets/profissoes.json';
import listaSegmentos from '@/assets/segmentos.json';

export default {
  data() {
    return {
      id: useCandidatoStore().dadosUser.id,
      nomeSocial: useCandidatoStore().dadosUser.nome_social,
      nomeCompleto: useCandidatoStore().dadosUser.nome_completo,
      email: useCandidatoStore().dadosUser.email,
      phone: useCandidatoStore().dadosUser.telefone,
      cellphone: useCandidatoStore().dadosUser.celular,
      cpf: useCandidatoStore().dadosUser.cpf,
      cep: useCandidatoStore().dadosUser.cep,
      rua: useCandidatoStore().dadosUser.rua,
      numCasa: useCandidatoStore().dadosUser.numero,
      complemento: useCandidatoStore().dadosUser.complemento,
      bairro: useCandidatoStore().dadosUser.bairro,
      cidade: useCandidatoStore().dadosUser.cidade,
      estado: useCandidatoStore().dadosUser.estado,
      area: useCandidatoStore().dadosUser.area,
      profissao: useCandidatoStore().dadosUser.profissao,
      verificado: useCandidatoStore().dadosUser.verificado,
      isDisabled: false,
      dialog: false,
      modalDelete: false,
      mensagem: '',
      color: '',
      snackbar: false,
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
        (v) => v === this.password || "Senhas não coincidem",
      ],
      items: ['Selecionar', 'AC', 'AL', 'AP', 'AM', 'BA',
        'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB',
        'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP',
        'SE', 'TO'],
    };
  },
  
  computed: {
    user() { return useCandidatoStore(); },
  },

  methods: {

    async atualizarCadastro() {
      console.clear();
      this.cpf = this.limparMascaraValores(this.cpf);
      try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/candidato/update`, {
          id: this.id,
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
          profissao: this.profissao,
          verificado: this.verificado,
          area: this.area,
        }, { withCredentials: true });

        this.mensagem = 'Cadastro atualizado com Sucesso!';
        this.color = 'success';
        this.snackbar = true;

        this.user.userLogado();

        console.info('%cAtualização bem-sucedida ✔👌', 'color: lightgreen; padding: 20px 0;', response.data);

      } catch (error) {
        this.mensagem = 'Erro na atualização do Cadastro!';
        this.color = 'error';
        this.snackbar = true;
        console.error('Erro ao atualizar o cadastro', error.response.data);
      }
    },

    async deletarConta() {
      console.clear();
      console.log(this.id);

      try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/candidato/delete`, {
          data: { id: this.id }, // Envia dados com a requisição DELETE
          withCredentials: true, // Garante que cookies são enviados
        });

        this.mensagem = 'Sua conta foi deletada 🙄!';
        this.color = 'warning';
        this.snackbar = true;

        setTimeout(() => {
          // this.$router.push('/'); 
          window.location.href = '/'; // Deixe este! Eu sei o motivo...
        }, 2000);

        console.info('%Exclusão bem-sucedida 🙄', 'color: lightyellow; padding: 20px 0;', response.data);

      } catch (error) {
        this.mensagem = 'Erro na exclusão da Conta!';
        this.color = 'error';
        this.snackbar = true;
        console.error('Erro ao excluir a conta', error.response.data);
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