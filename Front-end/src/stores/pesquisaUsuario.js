import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const usePesquisaUsuarioStore = defineStore('pesquisaUsuario', {
    state: () => ({
        dadosUser: '',
        id: '',
        requisicao: '',
        grupo: '',
        status: true,
        router: useRouter(),

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
                    this.status = true;

                    console.log("Usuário pesquisado:", this.dadosUser);

                    // Mostra foto ou avatar padrão
                    this.dadosUser.foto = this.dadosUser.foto === null ? '/src/assets/avatar.png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${this.dadosUser.foto}`;
                    this.dadosUser.capa = this.dadosUser.capa === null ? '/src/assets/capa (1).png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${this.dadosUser.capa}`;

                } catch (error) {
                    console.error('Erro ao obter dados do usuário', error.response.data);
                    // this.router.push('/');
                }
            }
        },

        extrairIniciais(nomeCompleto) {
            const iniciais = nomeCompleto.split(' ').map((n) => n[0]).join('');
            return iniciais.toUpperCase();
        }
    }
})
