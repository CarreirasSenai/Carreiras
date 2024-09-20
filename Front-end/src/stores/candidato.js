import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
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
        router: useRouter(),
    }),
    actions: {
        async userLogado() {
            const grupo = sessionStorage.getItem("grupo");

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${grupo}/read`, {
                    withCredentials: true
                });

                // Setando dados do user da requisição
                this.user.initials = this.extrairIniciais(response.data.usuario.nome_completo);
                this.user.fullName = response.data.usuario.nome_completo;
                this.user.email = response.data.usuario.email;

                // Mostra foto ou avatar padrão
                this.user.foto = response.data.usuario.foto === null ? '/src/assets/avatar.png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${response.data.usuario.foto}`;
                this.user.capa = response.data.usuario.capa === null ? '/src/assets/capa (1).png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${response.data.usuario.capa}`;

                // Altera visibilidade da navegação
                this.visibilidadeNaoLogado = false;
                this.visibilidadeLogado = true;

                // Atribuindo dados do usuario
                this.dadosUser = response.data.usuario;

                console.log("Usuário logado:", this.dadosUser);
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
