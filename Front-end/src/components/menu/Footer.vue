<template>
  <v-footer class="pa-0">
    <div class="text-center w-100 bg-deep-purple-accent-3 pa-2">
      <div class="ma-2">
        <v-btn v-for="icon in icons" size="small" :key="icon" :icon="icon" class="mx-2 bg-white" variant="text"></v-btn>
      </div>
      <div class="ma-2 mb-4">
        <p>E-mail: carreiras@gmail.com</p>
        <p>Telefone: (xx) xxxx-xxxx</p>
      </div>
      <v-divider></v-divider>
      <div class="mt-2">
        <p>{{ new Date().getFullYear() }} — <strong>Carreiras</strong>. Todos os direitos reservados.</p>
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>

<!-- <style scoped>
.footer-content {
  padding: 20px;
}

.social-icons {
  margin-bottom: 10px;
}

.contact-info {
  margin: 10px 0;
}

.footer-bottom {
  padding: 10px 0;
}

/* Adicionando a borda */
.footer-border {
  border-top: 1px solid #d8d6d6; /* Para borda roxa */
}
</style> -->