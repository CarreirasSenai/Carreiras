<template>
    <div class="div-users">
        <v-card-text>
            <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
                label="Pesquise alguém aqui" variant="solo" hide-details single-line @click:append-inner="onClick">
            </v-text-field>
        </v-card-text>
        <v-list lines="one" class="lista-users">
            <v-list-item v-for="n in 5" :key="n" :title="'Candidato ' + n" subtitle="Online"
                :prepend-avatar="'https://randomuser.me/api/portraits/women/' + n + '.jpg'"
                @click="buscaConversa(title = 'Candidato ' + n)">
            </v-list-item>
        </v-list>
    </div>
</template>

<style>
.div-users {
    max-width: 300px;
    min-width: 75px;
    width: 30%;
    height: 100vh;
    border-right: 1px solid #ddd;
    background-color: white;
}

@media(max-width:800px) {
    .div-users {
        max-width: none;
        width: 100%;
    }
}

.v-list {
    /* margin: 10px 0 10px 0; */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.v-list-item {
    cursor: pointer;
}
</style>

<script>
export default {
    data: () => ({
        loaded: false,
        loading: false,
    }),

    methods: {
        onClick() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
            }, 2000)
        },

        buscaConversa(valor) {
            if (window.innerWidth < 800) {
                document.querySelector('.dialogo').style.display = 'flex';
                document.querySelector('.div-users').style.display = 'none';
                document.querySelector('.menu-mob').style.display = 'none';
            } else {
                alert("Conversa do " + valor);
            }
        },
    },
}
</script>