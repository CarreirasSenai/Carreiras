<template>
    <v-btn color="deep-purple-accent-4" variant="outlined" @click="dialog = true" text="Finalizar Vaga"></v-btn>

    <v-dialog v-model="dialog">
        <v-container>
            <v-row class="d-flex justify-center">
                <v-col cols="12">
                    <v-form ref="form" v-model="isValid" class="my-4">
                        <v-card title="Justificativa para não Contratação dos Candidatos">
                            <v-card-text>
                                <div class="mb-5 d-flex flex-wrap ga-2">
                                    <p>Vaga: <v-chip variant="outlined">{{ vaga }}</v-chip></p>
                                </div>
                                <v-textarea rows="9" label="Justifique a não contratação dos candidatos desta vaga"
                                    v-model="justificativa" :rules="[rules.justificativa, rules.length(200)]"
                                    counter="200" variant="outlined"></v-textarea>
                                <v-card variant="tonal" class="mb-4" color="deep-purple-accent-4" title="Atenção"
                                    prepend-icon="mdi-alert">
                                    <v-card-item>
                                        Ao clicar em Enviar, todos os candidatos receberão a justificativa, com exceção
                                        do candidato finalista, pois presume-se que a empresa manterá contato
                                        diretamente com ele.
                                    </v-card-item>
                                </v-card>
                            </v-card-text>
                            <v-card-actions class="d-flex justify-space-between">
                                <v-btn text @click="dialog = false">Cancelar</v-btn>
                                <v-btn class="bt-primario" text="enviar" :disabled="!isValid" :loading="isLoading"
                                    @click="submitForm"></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-dialog>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import axios from 'axios';

export default {
    data: () => ({
        dialog: false,
        vaga: '',
        isValid: false,
        isLoading: false,
        justificativa: '',
        rules: {
            length: len => v => (v || '').length >= len || `Necessário ${len} caracteres para enviar a justificativa!`
        },
    }),

    props: {
        Candidatos: Object,
        Vaga: Object,
        MostrarVagas: Function
    },

    computed: {
        user() {
            return useCandidatoStore();
        },
    },

    mounted() {
        this.vaga = this.Vaga.raw.titulo;

        this.justificativa = `Prezado(a) Candidato,

Agradecemos sinceramente por sua participação no processo seletivo para a vaga de ${this.vaga} em nossa empresa. Foi um prazer conhecer seu perfil e avaliar suas qualificações.
Após uma análise detalhada de todos os candidatos, decidimos seguir com outro profissional cujo perfil está mais alinhado às necessidades específicas da posição no momento.
Gostaríamos de enfatizar que sua candidatura foi muito valorizada, e seu histórico demonstra competências e habilidades que consideramos muito relevantes. Encorajamos que continue acompanhando futuras oportunidades em nossa empresa, pois seria um prazer contar com você em processos futuros.
Desejamos sucesso em sua trajetória profissional e estamos à disposição para quaisquer esclarecimentos.

Atenciosamente,
${this.user.dadosUser.nome_fantasia}
        `;
    },

    methods: {
        async submitForm() {
            if (this.justificativa.length >= 200) {
                try {
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/candidatura/justifica/all`, {
                        justificativa: this.justificativa,
                        idVaga: this.Vaga.raw.id,
                        candidatos: this.Candidatos
                    }, { withCredentials: true });

                    console.log(response.data);
                    this.dialog = false;
                    this.MostrarVagas();

                } catch (error) {
                    console.error('Erro ao Atualizar Curso:', error.response.data);
                }
            }
        }
    }
}
</script>
