<template>
  <v-footer class="bg-indigo-1 text-center d-flex flex-column">
    <div class="footer-content">
      <div class="social-icons">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-2"
          variant="text"
        ></v-btn>
      </div>

      <div class="contact-info">
        <p>Email: carreiras@gmail.com</p>
        <p>Telefone: (xx) xxxx-xxxx</p>
      </div>
    </div>

    <v-divider></v-divider>

    <div class="footer-bottom">
      <p>{{ new Date().getFullYear() }} — <strong>Carreiras</strong>. Todos os direitos reservados.</p>
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

<style scoped>
.footer-content {
  padding: 20px;
}

.social-icons {
  margin-bottom: 10px;
}

.footer-links {
  margin: 10px 0;
}

.contact-info {
  margin: 10px 0;
}

.footer-bottom {
  padding: 10px 0;
}
</style>