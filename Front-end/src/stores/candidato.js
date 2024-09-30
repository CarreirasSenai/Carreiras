import { defineStore } from 'pinia';
import axios from 'axios';

export const useCandidatoStore = defineStore('candidato', {
    state: () => ({
        visibilidadeNaoLogado: true,
        visibilidadeLogado: false,
        dadosUser: '',
        grupo: '',
    }),
    actions: {
        async userLogado() {
            this.grupo = localStorage.getItem("grupo");

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${this.grupo}/read`, {
                    withCredentials: true
                });

                // Atribuindo dados do usuario
                this.dadosUser = response.data.usuario;

                console.log("Usuário logado:", this.dadosUser);

                // Mostra foto ou avatar padrão
                this.dadosUser.foto = this.dadosUser.foto === null ? '/src/assets/avatar.png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${this.dadosUser.foto}`;
                this.dadosUser.capa = this.dadosUser.capa === null ? '/src/assets/capa (1).png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${this.dadosUser.capa}`;

                // Altera visibilidade da navegação
                this.visibilidadeNaoLogado = false;
                this.visibilidadeLogado = true;

            } catch (error) {
                console.error('Erro ao obter dados do usuário', error.response.data);
            }
        },

        extrairIniciais(nomeCompleto) {
            const iniciais = nomeCompleto.split(' ').map((n) => n[0]).join('');
            return iniciais.toUpperCase();
        }
    }
})
