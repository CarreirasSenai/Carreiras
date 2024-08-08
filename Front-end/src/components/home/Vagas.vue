<template>
    <v-row class="ma-2">
        <v-col cols="12" lg="4" md="6" sm="6" v-for="n in 9" :key="n">
            <v-card class="elevation-2 rounded-lg observavel" style="border-color: #6200EA !important;">
                <v-card-title class="opacity-100 bg-deep-purple-accent-4 rounded-lg observavel">Analista de
                    Dados</v-card-title>
                <v-card-text class="pa-4">
                    <p class="observavel"><small>Local:</small> América, Joinville</p>
                    <p class="observavel"><small>Contrato:</small> CLT</p>
                    <p class="observavel"><small>Modalidade:</small> Híbrido</p>
                    <p class="observavel"><small>Remuneração:</small> Salário compatível com a função</p>
                </v-card-text>
                <small class="position-absolute top-0 right-0 ma-2 text-white">1 semana atrás</small>
                <v-card-actions class="d-flex justify-space-between">
                    <ModalDetalhesVaga />
                    <div class="d-flex align-center justify-center ga-2">
                        TOTVS
                        <img src="/src/assets/avatar.png" width="50px" class="rounded-circle">
                    </div>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    mounted() {
        function observarEntrada(entries, observer) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visivel');
                    }, index * 10); // Ajuste o tempo conforme necessário
                }
            });
        }

        const observer = new IntersectionObserver(observarEntrada, {
            root: null,
            rootMargin: '0px',
            threshold: 0.7
        });

        // Observar os elementos observavel
        this.$el.querySelectorAll('.observavel').forEach((element) => {
            observer.observe(element);
        });
    }
};
</script>

<style scoped>
@keyframes fadeInLeft {
    0% {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    to {
        opacity: 1;
        transform: translateZ(0);
    }
}

@media(max-width:600px) {
    .row-rev div:nth-child(2) {
        display: flex;
        justify-content: start;
    }
}

.v-card {
    transition: transform 0.3s;
}

.v-card:hover {
    transform: scale(1.05);
}

.v-card.visivel {
    animation: fadeInLeft 1s normal;
}

.v-card-title.visivel {
    animation: fadeInLeft 2s normal;
}
</style>
