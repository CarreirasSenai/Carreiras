<template>
    <Navbar />
    <div v-if="!empty && dadosCarregados">
        <FotoCapa :Dados="dados" />
        <v-row class="ma-5 mb-0">
            <v-col cols="12" md="6" sm="6" xs="12">
                <InformacoesPessoais :Dados="dados" />
            </v-col>
            <v-col cols="12" md="6" sm="6" xs="12">
                <LinksCandidato :Dados="dados"/>
            </v-col>
        </v-row>
        <v-divider class="ma-7"></v-divider>
        <Curriculo :Dados="dados" />
    </div>
    <div v-else-if="!empty" class="text-center h-75 mt-15 d-flex align-center justify-center">
        <v-progress-circular color="deep-purple-accent-4" indeterminate :size="50"></v-progress-circular>
    </div>
    <v-empty-state v-if="empty" headline="Oops, 404" title="Página não encontrada"
        text="A página que você estava procurando não existe" icon="mdi-emoticon-dead">
    </v-empty-state>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useCandidatoStore } from '@/stores/candidato';
import { usePesquisaUsuarioStore } from '@/stores/pesquisaUsuario';

export default {
    data: () => ({
        empty: false,
        dadosCarregados: false,
        dados: '',
    }),
    computed: {
        auth() {
            return useAuthStore();
        },
        user() {
            return useCandidatoStore();
        },
        pesquisaUser() {
            return usePesquisaUsuarioStore();
        },
    },
    created() {
        this.auth.autenticacao();
        this.pesquisaUser.id = this.$route.query.id;
        this.pesquisaUser.requisicao = this.$route.query.requisicao;
    },
    mounted() {
        this.atribuirValores();
    },
    methods: {
        validarRequisitante() {
            if (this.pesquisaUser.requisicao === 'candidato') {
                if (localStorage.getItem('grupo') === 'empresa') {
                    console.log('\npesquisaUser');
                    this.pesquisaUser.pesquisaUser();
                    return this.pesquisaUser;
                } else {
                    this.empty = true;
                    return null;
                }
            } else {
                console.log('\nuserLogado');
                this.user.userLogado();
                return this.user;
            }
        },

        atribuirValores() {
            const requisitante = this.validarRequisitante();

            if (!requisitante) {
                return;
            }

            // Verifica se os dados são diferentes para evitar reatribuição
            // if (JSON.stringify(this.dados) !== JSON.stringify(requisitante.dadosUser)) {
            setTimeout(() => {
                this.dadosCarregados = true;
                this.dados = requisitante.dadosUser;
                console.log(this.dados);                
                console.log("Atribuindo novos valores a this.dados");
            }, 1000);
            // }
        }
    },
    watch: {
        // Observa mudanças no objeto user.dadosUser
        'user.dadosUser': {
            handler(novo, antigo) {
                // console.clear();
                console.log('O objeto dadosUser foi alterado: \n', 'Novo:', novo, '\n', 'Antigo:', antigo);

                // Evita chamar atribuirValores se os dados não mudaram de fato
                if (JSON.stringify(novo) !== JSON.stringify(antigo)) {
                    this.atribuirValores();
                }
            },
            deep: true // Monitorar todas as propriedades do objeto
        }
    }

}
</script>

<style>
* {
    /* border: 1px solid red; */
}

.mdi-pencil,
.mdi-dots-horizontal,
.mdi-instagram,
.mdi-facebook,
.mdi-linkedin,
.mdi-github,
.mdi-web {
    color: #6732d2;
}
</style>