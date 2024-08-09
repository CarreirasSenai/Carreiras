import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
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
            try {
                const response = await axios.get('http://localhost:4000/candidato/read', {
                    withCredentials: true
                });

                this.user.initials = this.extrairIniciais(response.data.usuario.nome_completo);
                this.user.fullName = response.data.usuario.nome_completo;
                this.user.email = response.data.usuario.email;
                this.visibilidadeNaoLogado = !this.visibilidadeNaoLogado;
                this.visibilidadeLogado = !this.visibilidadeLogado;

                console.log('Usuário autenticado!', response.data);

            } catch (error) {
                console.error('Erro ao obter dados do usuário', error.response ? error.response.data : error.message);
                this.$router.push('/');
            }
        },
        extrairIniciais(nomeCompleto) {
            const iniciais = nomeCompleto.split(' ').map((n) => n[0]).join('');
            return iniciais.toUpperCase();
        }
    }
})
