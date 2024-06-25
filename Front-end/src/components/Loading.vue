<template>
    <div class="loader">
        <h1>Carreiras</h1>
        <div>
            <div v-for="(filled, index) in favos" :key="index" class="favo" :class="{ filled: filled }"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            favos: [false, false, false, false, false]
        };
    },
    mounted() {
        this.fillFavos();
    },
    methods: {
        fillFavos() {
            const interval = 5000 / this.favos.length; // Divide 10 segundos pelo número de favos
            this.favos.forEach((_, index) => {
                setTimeout(() => {
                    this.favos[index] = true; // Atualiza diretamente o valor no array
                }, index * interval);
            });
        }
    }
};
</script>

<style>
.loader {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    background-color: white;
    z-index: 1;
    gap: 20px;
}

.loader div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.favo {
    width: 35px;
    height: 30px;
    background-color: lightgray;
    margin: 0 5px;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    transform: rotate(90deg);
    transition: background-color 0.5s;
}

.favo.filled {
    background-color: #5D16EA;
    /* Cor do favo preenchido */
}
</style>
