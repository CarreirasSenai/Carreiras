<template>
    <!-- <div class="text-center"> -->
    <v-btn variant="tonal" @click="dialog = true">
        Ver Detalhes
    </v-btn>

    <v-dialog v-model="dialog" min-width="300px" max-width="1000px">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card title="Analista de Dados">
                        <v-card-text style="max-height: 60vh;" class="overflow-auto d-flex flex-column ga-1">
                            <p><small>Local:</small> América, Joinville</p>
                            <p><small>Contrato:</small> CLT</p>
                            <p><small>Modalidade:</small> Híbrido</p>
                            <p><small>Remuneração:</small> Salário compativel com a função + Vale refeição</p>
                            <p class="d-flex flex-wrap">
                                <small>Responsabilidades:</small>
                            <ul class="ml-6">
                                <li>Desenvolver e manter aplicações web utilizando Angular para o front-end.</li>
                                <li>Conceber, implementar e gerir bases de dados SQL para suportar a funcionalidade das
                                    aplicações.</li>
                                <li>Criar e manter APIs usando Python para garantir uma integração perfeita entre os
                                    sistemas front-end e back-end.</li>
                            </ul>
                            </p>
                            <p class="d-flex flex-wrap align-center ga-2"><small>Habilidades Exigidas:</small>
                                <v-chip variant="outlined" v-for="n in 5" :k="n">
                                    Javascript
                                </v-chip>
                            </p>
                            <p class="d-flex flex-wrap align-center ga-2"><small>Habilidades Exigidas:</small>
                                <v-chip variant="outlined" v-for="n in 5" :k="n">
                                    React
                                </v-chip>
                            </p>
                            <p class="d-flex flex-wrap"><small>Benefícios:</small>
                            <ul class="ml-6">
                                <li>Plano Dentário</li>
                                <li>Vale Refeição</li>
                                <li>Gym Pass</li>
                            </ul>
                            </p>
                            <p><small>Sobre a Vaga:</small> Somos a Fintech Magalu, a vertical de produtos e
                                serviços financeiros do grupo Magazine Luiza. Como parte de um dos pilares
                                estratégicos do Magalu, nosso ecossistema possui tecnologias de meios de pagamento
                                desenvolvidas por um time incrível.

                                Sim! Temos a cultura de desenvolver a tecnologia de todos os nossos produtos e
                                gostamos do desafio de trabalhar em larga escala, cuidando para que os clientes
                                tenham uma experiência excepcional conosco.

                                Ao longo dos últimos anos crescemos de forma exponencial e nos tornamos uma das
                                maiores empresas do segmento. Desenvolvemos soluções para contas digitais, gestão de
                                recebíveis, split de pagamentos, saques e transferências, pagamentos corporativos,
                                adquirência, pix, cartão de crédito, crédito, e muito mais. Contamos com milhões de
                                clientes presentes em todo o território nacional e estamos sempre buscando formas
                                inovadoras de criar nossos produtos.

                                Nosso propósito é digitalizar empresas, especialmente empreendedores brasileiros,
                                além de promover a inclusão de pessoas no sistema financeiro através das nossas
                                plataformas!

                                Estamos procurando alguém que saiba lidar com desafios diários e com capacidade de
                                trabalhar em equipe. Que some ao time, faça as coisas acontecerem e esteja preparado
                                para as mudanças tecnológicas constantes e demandas próprias e desafiadoras.

                                Queremos construir produtos cada vez melhores - inovadores, rentáveis, escaláveis e
                                com os quais as pessoas adoram trabalhar. Buscamos oferecer o melhor com o que
                                temos. Gostamos de pessoas e nos ajudamos mutuamente. Se você é apaixonado(a) pelo o
                                que faz, estuda sempre, forma talentos e trabalha em equipe essa vaga é para você!
                            </p>
                        </v-card-text>
                        <!-- <small class="position-absolute top-0 right-0 ma-2 mr-12 mt-3">1 semana atrás</small> -->
                        <span class="mdi mdi-close position-absolute top-0 right-0 mr-2" @click="dialog = false"></span>
                        <v-card-actions class="d-flex justify-space-between">
                            <div class="d-flex flex-wrap ga-2">
                                <v-btn class="bt-primario">Inscrever-se</v-btn>
                                <EditarVagaEmpresa />
                                <small>O button alterna conforme o user logado.</small>
                            </div>
                            <div class="d-flex align-center justify-center ga-2">
                                TOTVS
                                <img src="/src/assets/avatar.png" width="50px">
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-dialog>
    <!-- </div> -->
</template>

<script>
import EditarVagaEmpresa from './EditarVagaEmpresa.vue';

export default {
    data() {
        return {
            dialog: false,
        }
    },
}
</script>

<style scoped>
* {
    /* border: 1px solid red; */
}

small {
    color: #6732d2;
    font-size: smaller !important;
}
</style>