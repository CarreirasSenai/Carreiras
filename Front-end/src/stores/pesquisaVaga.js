import { defineStore } from "pinia";
import axios from "axios";

export const usePesquisaVaga = defineStore('pesquisaVaga', {
    state: () => ({
        dialog: false,
        loaded: false,
        loading: false,
        visibilidadeHome: true,
        visibilidadeFiltroVagas: false,
        form: {
            palavraChave: '',
            cidade: '',
            estado: '',
            contrato: '',
            modalidade: '',
            remuneracao: '',
            dataInicio: '',
            dataFim: '',
        },
        pesquisa: []
    }),

    actions: {
        onClick() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
                this.pesquisar();
            }, 2000)
        },

        onEnter() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
            }, 2000)
        },

        async pesquisar() {
            console.clear();
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/pesquisa`, {
                    params: {
                        dados: this.form,
                    }
                });

                this.visibilidadeHome = false;
                this.visibilidadeFiltroVagas = true;
                this.dialog = false,

                this.pesquisa = response.data.result.filter(vaga => vaga.status === 1);
                console.log(this.pesquisa);

                console.log('Busca enviada!', response.data);

            } catch (error) {
                console.log('Erro ao enviar busca!', error.response);
            }
        },
    }
})