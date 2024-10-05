<template>
    <div v-if="dadosCarregados" class="div-capa-foto rounded-b-xl elevation-2" id="foto-capa">
        <img class="capa" :src="dados.capa">
        <div class="pos-capa">
            <v-row align="center" justify="space-evenly">
                <v-col cols="12" md="4" lg="3">
                    <div class="div-foto-perfil">
                        <div>
                            <img :src="dados.foto" class="foto-perfil" alt="Foto de Perfil">
                        </div>
                        <div>
                            <h3 class="cor-primaria">{{ dados.nome_fantasia }}</h3>
                            <h5 class="text-grey-darken-2">{{ dados.cidade }}, {{ dados.bairro }}, {{
                                dados.estado }}</h5>
                            <MenuEditarEmpresa
                                v-if="grupo === 'empresa' && user.dadosUser.id === pesquisaUser.dadosUser.id || !pesquisaUser.dadosUser.id && grupo === 'empresa'"
                                style="height: 20px !important;" class="d-flex align-center" />
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="8" lg="8">
                    <span v-html="dados.descricao"></span>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import { usePesquisaUsuarioStore } from '@/stores/pesquisaUsuario';

export default {
    data: () => ({
        dialog: false,
        grupo: '',
        dados: '',
        dadosCarregados: false,
        empty: false,
    }),
    computed: {
        user() {
            return useCandidatoStore();
        },
        pesquisaUser() {
            return usePesquisaUsuarioStore();
        },
    },
    created() {
        this.pesquisaUser.id = this.$route.query.id;
        this.pesquisaUser.requisicao = this.$route.query.requisicao;
    },
    mounted() {
        this.grupo = localStorage.getItem('grupo');
        this.atribuirValores();
    },
    methods: {
        validarRequisitante() {
            if (this.pesquisaUser.requisicao === 'empresa') {
                if (localStorage.getItem('grupo') === 'candidato' || this.pesquisaUser.requisicao) {
                    console.log('\npesquisaUser');
                    this.pesquisaUser.pesquisaUser();
                    return this.pesquisaUser;

                } else {
                    this.empty = true;
                    return null;
                }
            } else if (!this.$route.query.id && !this.$route.query.requisicao) {
                console.log('\nuserLogado');
                this.user.userLogado();
                return this.user;
            } else {
                window.location.href = "/";
            }
        },

        atribuirValores() {
            const requisitante = this.validarRequisitante();

            if (!requisitante) {
                return;
            }

            setTimeout(() => {
                this.dados = requisitante.dadosUser;
                this.dadosCarregados = true;
                this.$emit('dados-carregados', this.dadosCarregados);
            }, 1000);
        }
    },
    watch: {
        // Observa mudanças no objeto dados
        'user.dadosUser': {
            handler(novo, antigo) {
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

<style lang="scss" scoped>
* {
    // border: 1px solid red;
}

.box-shadow {
    box-shadow: 0 2px 4px gray;
}

.div-capa-foto {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 25px;
}

.capa {
    height: 250px;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.pos-capa {
    height: 150px auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 25px;
    gap: 15px;
}

.div-foto-perfil {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    min-width: 300px;
    gap: 20px;
}

.foto-perfil {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 2px solid #6832D2;
    object-fit: cover;
}

.descricao {
    min-width: 300px;
    max-width: 800px;
    width: 100%;
    padding: 15px;
}

@media(max-width:800px) {
    .div-capa-foto {
        margin: 0;
    }

    .pos-capa {
        justify-content: center !important;
        padding-top: 130px;
    }

    .div-foto-perfil {
        display: flex;
        flex-direction: column;
        gap: 5px;
        position: absolute;
        top: 150px;
        right: 0;
        left: 0;
        justify-content: center;
    }

    .div-foto-perfil div {
        text-align: center;
    }

    .box-shadow {
        box-shadow: none;
    }
}
</style>