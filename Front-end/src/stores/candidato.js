import { defineStore } from 'pinia';
import axios from 'axios';

export const useCandidatoStore = defineStore('candidato', {
    state: () => ({
        user: {
            initials: '',
            fullName: '',
            email: '',
            foto: '',
            capa: '',
        },
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

                // Setando dados do user da requisição
                this.user.initials = this.dadosUser.nome_completo ? this.extrairIniciais(this.dadosUser.nome_completo) : this.extrairIniciais(this.dadosUser.nome_fantasia);
                this.user.fullName = this.dadosUser.nome_completo;
                this.user.email = this.dadosUser.email;

                // Mostra foto ou avatar padrão
                this.user.foto = this.dadosUser.foto === null ? '/src/assets/avatar.png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${this.dadosUser.foto}`;
                this.user.capa = this.dadosUser.capa === null ? '/src/assets/capa (1).png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${this.dadosUser.capa}`;

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
