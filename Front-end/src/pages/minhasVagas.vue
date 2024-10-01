<template>
  <Navbar />

  <div class="suasVagas">
    <div class="header">
      <h1>Suas Vagas</h1>
      <p>Veja as Vagas que você se Candidatou!</p>
    </div>

    <div class="listaVagas">
      <h2>Vagas Candidatadas:</h2>
      <div class="listaVagas">
        <Vagas />
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useCandidatoStore } from '@/stores/candidato';

export default {
  computed: {
    auth() {
      return useAuthStore();
    },
    user() {
      return useCandidatoStore();
    },
  },
  mounted() {
    this.auth.autenticacao();
    this.user.userLogado();
  },
}
</script>

<style scoped>
.suasVagas {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Responsivo */
@media (max-width: 768px) {
  .suasVagas {
    max-width: 100%;
    margin: 20px;
  }
}

@media (max-width: 480px) {
  .suasVagas {
    padding: 10px;
  }
}

.header {
  background-color: #6732d2;
  color: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
}

.header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.header p {
  font-size: 18px;
  margin-bottom: 20px;
}

.listaVagas {
  padding: 20px;
}

.listaVagas h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
</style>