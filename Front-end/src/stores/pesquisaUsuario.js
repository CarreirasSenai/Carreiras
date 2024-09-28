import { defineStore } from 'pinia';
import axios from 'axios';

export const usePesquisaUsuarioStore = defineStore('pesquisaUsuario', {
    state: () => ({
        user: {
            initials: '',
            fullName: '',
            email: '',
            foto: '',
            capa: '',
        },
        dadosUser: '',
        id: '',
        requisicao: '',
        grupo: '',
        visibilidadeNaoLogado: true,
        visibilidadeLogado: false,
    }),
    actions: {
        async pesquisaUser() { 
            const grupo = this.requisicao;

            if (grupo) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${grupo}/read`, {
                        params: {
                            id: this.id,
                            requisicao: this.requisicao
                        },
                        withCredentials: true
                    });

                    this.dadosUser = response.data.usuario;

                    console.log("Usuário pesquisado:", this.dadosUser);

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
            }
        },

        extrairIniciais(nomeCompleto) {
            const iniciais = nomeCompleto.split(' ').map((n) => n[0]).join('');
            return iniciais.toUpperCase();
        }
    }
})
