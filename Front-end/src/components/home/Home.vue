<template>
  <v-card variant="elevated"
    class="text-center bg-deep-purple-accent-4 ma-5 mb-3 pt-10 pb-10 pl-5 pr-5 rounded-lg elevation-2">
    <h1 style="font-size: 4vh;">Encontre uma carreira para você!</h1>
    <v-row>
      <v-card-text class="d-flex justify-center">
        <v-col cols="12" sm="8" md="8">
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
            label="Digite um cargo, cidade, estado." variant="solo" hide-details single-line
            @click:append-inner="onClick">
          </v-text-field>
        </v-col>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    loading: false,
  }),

  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
  },
}
</script>