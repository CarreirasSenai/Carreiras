<template>
  <v-card v-if="pesquisa.visibilidadeHome" variant="elevated"
    class="text-center bg-deep-purple-accent-4 mb-3 pt-10 pb-10 pl-5 pr-5 rounded-lg elevation-2">
    <h1 style="font-size: 4vh;">Encontre uma carreira para você {{ user.dadosUser.nome_completo }}!</h1>
    <v-row>
      <v-card-text class="d-flex justify-center">
        <v-col cols="12" sm="8" md="8">
          <v-form @submit.prevent="pesquisa.pesquisar">
            <v-text-field v-model="pesquisa.form.palavraChave" :loading="pesquisa.loading" append-inner-icon="mdi-magnify"
              density="compact" label="Procure uma vaga aqui." variant="solo" hide-details single-line
              @click:append-inner="pesquisa.onClick" @keyup.enter="pesquisa.onEnter">
            </v-text-field>
          </v-form>
        </v-col>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';
import { usePesquisaVaga } from '@/stores/pesquisaVaga';

export default {
  computed: {
    user() { return useCandidatoStore(); },
    pesquisa() { return usePesquisaVaga(); },
  },
}
</script>