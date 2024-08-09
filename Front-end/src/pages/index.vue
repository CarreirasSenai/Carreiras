<template>
  <Navbar />
  <Home v-if="visibilidadeHome" />
  <Vagas />
  <FiltroVagas v-if="visibilidadeFiltroVagas" />
</template>

<!-- Options API -->
<script>
import { useCounterStore } from '@/stores/counter';

export default {
  data() {
    return {
      visibilidadeHome: true,
      visibilidadeFiltroVagas: false,
    };
  },
  computed: {
    counter() {
      return useCounterStore();
    },
  },
  mounted() {
    this.lojaPinia();
  },
  methods: {
    lojaPinia() {
      this.counter.mudaNome;
    }
  }
};
</script>

<!-- Composition API -->
<!-- <script setup>
import { ref, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';

// reactive state
const visibilidadeHome = ref(true);
const visibilidadeFiltroVagas = ref(false);

// Initialize the Pinia store
const counter = useCounterStore();

// Update the counter state
counter.count++;
counter.$patch({ count: counter.count + 1 });
counter.increment();
</script> -->