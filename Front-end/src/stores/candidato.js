import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import axios from 'axios';

export const useCandidatoStore = defineStore('candidato', {
    state: () => ({
        user: {
            initials: '',
            fullName: '',
            email: ''
        },
        visibilidadeNaoLogado: true,
        visibilidadeLogado: false,
    }),
    actions: {
        async userLogado() {
            const router = useRouter();  // Use o useRouter dentro de actions

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/candidato/read`, {
                    withCredentials: true
                });

                this.user.initials = this.extrairIniciais(response.data.usuario.nome_completo);
                this.user.fullName = response.data.usuario.nome_completo;
                this.user.email = response.data.usuario.email;
                this.user.id = response.data.usuario.id;
                this.visibilidadeNaoLogado = false;
                this.visibilidadeLogado = true;

                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('visibilidadeLogado', JSON.stringify(this.visibilidadeLogado));

            } catch (error) {
                console.error('Erro ao obter dados do usuário', error.response ? error.response.data : error.message);
                router.push('/');
            }
        },
        extrairIniciais(nomeCompleto) {
            const iniciais = nomeCompleto.split(' ').map((n) => n[0]).join('');
            return iniciais.toUpperCase();
        },
        loadStateFromStorage() {
            const userData = localStorage.getItem('user');
            const visibilidadeLogado = localStorage.getItem('visibilidadeLogado');

            if (userData) {
                this.user = JSON.parse(userData);
            }

            if (visibilidadeLogado) {
                this.visibilidadeLogado = JSON.parse(visibilidadeLogado);
                this.visibilidadeNaoLogado = !this.visibilidadeLogado;
            }
        }
    }
})
