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
                      <v-autocomplete label="Área de Atuação" v-model="form.area" :items="listaSegmentos"
                        variant="underlined"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-autocomplete label="Profissão ou Cargo Desejado" v-model="form.profissao"
                        :items="listaProfissoes" variant="underlined"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.nomeSocial" :rules="nomeSocialRules" label="Nome social"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.nomeCompleto" :rules="nomeCompletoRules" label="Nome completo"
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
                      <v-text-field v-model="form.cpf" :rules="cpfRules" label="CPF" v-mask="'###.###.###-##'"
                        :disabled="true" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" lg="3">
                      <v-text-field v-model="form.cep" :rules="cepRules" label="CEP"
                        variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.rua" :rules="ruaRules" label="Rua"
                        variant="underlined"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.complemento" label="Complemento" variant="underlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="6">
                      <v-text-field v-model="form.numero" :rules="numeroRules" label="Nº"
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
import listaProfissoes from '@/assets/profissoes.json';
import listaSegmentos from '@/assets/segmentos.json';
export default {
  data() {
    return {
      form: {
        area: "",
        profissao: "",
        nomeSocial: "",
        nomeCompleto: "",
        email: "",
        telefone: "",
        celular: "",
        cpf: "",
        inscricaoEstadual: "",
        cep: "",
        numero: "",
        complemento: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        verificado: ""
      },
      responsavelAdm: "",
      listaProfissoes: listaProfissoes,
      listaSegmentos: listaSegmentos,
      modalDelete: false,
      nomeSocialRules: [(v) => !!v || "Razão social requerida"],
      nomeCompletoRules: [(v) => !!v || "Nome completo requerido"],
      emailRules: [
        (v) => !!v || "E-mail requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
        (v) => v.length <= 254 || "E-mail deve ter no máximo 254 caracteres",
      ],
      telefoneRules: [
        (v) => !!v || "Telefone requerido",
        (v) => v.length >= 14 || "Telefone deve ter pelo menos 14 caracteres",
        (v) => !/^(\d)\1+$/.test(v.replace(/\D/g, '')) || "Informe um celular válido"
      ],
      celularRules: [
        (v) => !!v || "Celular requerido",
        (v) => v.length >= 15 || "Celular deve ter pelo menos 15 caracteres",
        (v) => !/^(\d)\1+$/.test(v.replace(/\D/g, '')) || "Informe um celular válido"
      ],
      cpfRules: [
        (v) => !!v || "CPF requerido",
        (v) => v.length >= 14 || "CPF deve ter pelo menos 14 caracteres",
      ],
      inscricaoEstadualRules: [(v) => !!v || "Inscrição estadual requerida"],
      cepRules: [
        (v) => !!v || "CEP requerido",
        (v) => v.length === 8 || "CEP deve ter 8 caracteres",
        (v) => /^\d+$/.test(v) || "CEP deve conter apenas números",
      ],
      numeroRules: [
        (v) => !!v || "Número requerido",
        (v) => v > 0 || "O Número deve ser maior que zero",
        (v) => /^\d+$/.test(v) || "Nº deve conter apenas números",
      ],
      ruaRules: [
        (v) => !!v || "Rua requerida",
        (v) => v.length >= 5 || "Rua deve ter pelo menos 5 caracteres",
      ],
      bairroRules: [
        (v) => !!v || "Bairro requerido",
        (v) => v.length >= 3 || "Bairro deve ter pelo menos 3 caracteres",
      ],
      cidadeRules: [
        (v) => !!v || "Cidade requerida",
        (v) => v.length >= 3 || "Cidade deve ter pelo menos 3 caracteres",
      ],
      estadoRules: [(v) => !!v || "Estado requerido"],
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
        this.form.cpf = this.limparMascaraValores(this.form.cpf);
        try {
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/candidato/update`, {
            id: this.form.id,
            nomeSocial: this.form.nomeSocial,
            nomeCompleto: this.form.nomeCompleto,
            email: this.form.email,
            phone: this.form.telefone,
            cellphone: this.form.celular,
            cpf: this.form.cpf,
            cep: this.form.cep,
            rua: this.form.rua,
            numCasa: this.form.numero,
            complemento: this.form.complemento,
            bairro: this.form.bairro,
            cidade: this.form.cidade,
            estado: this.form.estado,
            profissao: this.form.profissao,
            verificado: this.form.verificado,
            area: this.form.area
          }, { withCredentials: true });

          console.log("Resposta: ", response.data);
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
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/candidato/delete`, {
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
      this.form.nomeSocial = this.User.nome_social,
      this.form.nomeCompleto = this.User.nome_completo,
      this.form.email = this.User.email,
      this.form.telefone = this.User.telefone,
      this.form.celular = this.User.celular,
      this.form.cpf = this.User.cpf,
      this.form.cep = this.User.cep,
      this.form.numero = this.User.numero,
      this.form.complemento = this.User.complemento,
      this.form.rua = this.User.rua,
      this.form.bairro = this.User.bairro,
      this.form.cidade = this.User.cidade,
      this.form.estado = this.User.estado,
      this.form.profissao = this.User.profissao,
      this.form.area = this.User.area,
      this.form.verificado = this.User.verificado.toString()
  }
};
</script>