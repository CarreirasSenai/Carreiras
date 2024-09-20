import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        router: useRouter(),
    }),
    actions: {
        async autenticacao() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth`, {
                    withCredentials: true
                });
                console.log('Usuário autenticado!', response.data);

            } catch (error) {
                console.error('Usuário não autenticado!', error.response.data);
                this.router.push('/');
            }
        },
    }
})
