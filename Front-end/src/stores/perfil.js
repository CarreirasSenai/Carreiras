import { defineStore } from 'pinia'
import axios from 'axios';

export const usePerfilStore = defineStore('perfil', {
    state: () => ({
        dialog: false,
        form: {
            foto: null,
            capa: null,
            descricao: ''
        },
        dados: '',
    }),
    actions: {
        async mostrarPerfil() {
            // console.clear();
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/perfil/read`, {
                    withCredentials: true
                });

                this.dados = response.data.perfil;

                const foto = response.data.perfil.foto === null ? '/src/assets/avatar.png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${response.data.perfil.foto}`;
                const capa = response.data.perfil.capa === null ? '/src/assets/capa (1).png' : `${import.meta.env.VITE_BACKEND_URL}/uploads/perfil/${response.data.perfil.capa}`;

                this.form.foto = foto;
                this.form.capa = capa;
                this.form.descricao = response.data.perfil.descricao;

                console.log(response.data);

            } catch (error) {
                console.error('Erro', error.response.data);
            }
        }
    }
})
