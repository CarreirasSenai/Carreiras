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
        <div v-if="vagas.length === 0">
          Você ainda não se candidatou a nenhuma vaga.
        </div>
        <div v-else>
          <div v-for="vaga in vagas" :key="vaga.id" class="vaga-item">
            <h3>{{ vaga.titulo }}</h3>
            <p class="line-clamp"><strong>Descrição:</strong> {{ vaga.descricao }}</p>
            <p><strong>Local:</strong> {{ vaga.cidade }}, {{ vaga.estado }}</p>
            <p><strong>Remuneração:</strong> {{ vaga.remuneracao }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useCandidatoStore } from "@/stores/candidato";
import axios from "axios";

export default {
  data() {
    return {
      vagas: [], // Inicializa como um array vazio
    };
  },
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
    this.buscarVagasInscritas();
  },
  methods: {
    async buscarVagasInscritas() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vaga/vagas-inscritas`, {
          withCredentials: true,
        });
        console.log(response.data); // Adicione esta linha para verificar a resposta
        this.vagas = response.data.result || []; // Garante que seja um array
      } catch (error) {
        console.error("Erro ao buscar vagas inscritas:", error);
      }
    },
  },
};
</script>

<style scoped>

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.suasVagas {
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

.vaga-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>