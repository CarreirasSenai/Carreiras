<template>
    <div class="text-start d-flex justify-start">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn variant="text" v-bind="activatorProps" class="w-100  justify-start rounded-0">Editar Foto e
                    Capa</v-btn>
            </template>

            <v-form @submit.prevent="submit">
                <v-card title="Editar Foto e Capa">
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12" md="12">
                                <v-file-input v-model="form.foto" accept="image/png, image/jpeg, image/bmp"
                                    label="Foto de perfil" placeholder="Foto de perfil" prepend-icon="mdi-camera">
                                </v-file-input>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-file-input v-model="form.capa" accept="image/png, image/jpeg, image/bmp"
                                    label="Foto de capa" placeholder="Foto de capa" prepend-icon="mdi-camera">
                                </v-file-input>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="Limpar" variant="plain" @click="form.foto = null, form.capa = null"
                            class="border-red-accent-4"></v-btn>
                        <v-btn text="Fechar" variant="outlined" @click="dialog = false"></v-btn>
                        <v-btn text="Salvar" color="Enviar" variant="tonal" type="submit"
                            class="bg-purple-darken-4"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>


<script>
import { useCandidatoStore } from '@/stores/candidato';
import axios from 'axios';

export default {
    data: () => ({
        dialog: false,
        form: {
            foto: null,
            capa: null
        }
    }),
    computed: {
        user() {
            return useCandidatoStore();
        }
    },
    methods: {
        async submit(event) {
            console.clear();
            console.log(this.form);

            const dados = await event;

            // alert(JSON.stringify(dados, null, 2))

            const foto = this.form.foto === null ? this.user.dadosUser.foto : this.form.foto;
            const capa = this.form.capa === null ? this.user.dadosUser.capa : this.form.capa;

            if (dados.valid === true) {
                const formData = new FormData();
                formData.append('foto', foto);
                formData.append('capa', capa);

                try {
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/perfil/update`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true
                    });

                    console.log(response.data);
                    this.dialog = false;
                    this.user.userLogado();

                } catch (error) {
                    console.error('Erro', error.response.data);
                }
            }

        }
    }

}
</script>

<style lang="scss" scoped>
.mdi {
    color: #6732d2af;
}

.mdi:hover {
    color: #6732d2;
}

.div-button-edit {
    border-radius: 100%;
    height: 50px;
    width: 50px;
    /* border: 1px solid red; */
    position: absolute !important;
    right: 0;
    top: 115px;
}
</style>