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
                            <EditarHabilidade v-if="visibilidade && grupo === 'candidato'" :MostrarHabilidades="mostrarHabilidades"
                                :Habilidades="habilidades" :Id="id" />
                        </v-card>
                    </v-col>
                    <span v-if="!habilidades.length" class="ma-4">Não há habilidades.</span>
                </v-row>
                <AdicionarHabilidade v-if="!visibilidade && grupo === 'candidato'" :MostrarHabilidades="mostrarHabilidades" />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-col>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            grupo: '',
            id: '',
            habilidades: [],
            visibilidade: false
        };
    },
    mounted() {
        this.mostrarHabilidades();
        this.grupo = localStorage.getItem('grupo');
    },
    methods: {
        async mostrarHabilidades() {
            const id = this.$route.query.id;
            
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/habilidade/read`, {
                    params: {
                        id: id,
                    },
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