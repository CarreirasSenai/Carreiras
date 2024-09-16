<template>
    <v-col cols="12" md="6">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <i class="mdi mdi-star cor-primaria mr-2"></i>
                <h3 class="cor-primaria">Habilidades</h3>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col cols="12" class="bloco">
                        <v-card variant="text">
                            <v-chip class="ma-1" v-for="items in habilidades" :key="items">{{ items }}</v-chip>
                            <EditarHabilidade v-if="visibilidade" :MostrarHabilidades="mostrarHabilidades"
                                :Habilidades="habilidades" :Id="id" />
                        </v-card>
                    </v-col>
                    <span v-if="!habilidades.length" class="ma-4">Adicione suas habilidades.</span>
                </v-row>
                <AdicionarHabilidade v-if="!visibilidade" :MostrarHabilidades="mostrarHabilidades" />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            id: '',
            habilidades: [],
            visibilidade: false
        };
    },
    mounted() {
        this.mostrarHabilidades();
    },
    methods: {
        async mostrarHabilidades() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/habilidade/read`, {
                    withCredentials: true
                });

                console.log('Habilidades:', response.data);
                this.id = response.data.result.id;
                this.habilidades = JSON.parse(response.data.result.habilidades);

                this.visibilidade = true;

            } catch (error) {
                console.error('Erro', error.response.data);
                this.visibilidade = false;
            }
        },
    }
};
</script>