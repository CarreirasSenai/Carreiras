<template>
  <Navbar />
  <Home v-if="visibilidadeHome" />
  <div>Current Count: {{ counter.count }}</div>
  <Vagas />
  <FiltroVagas v-if="visibilidadeFiltroVagas" />
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';

// Initialize the Pinia store
const counter = useCounterStore();

// Update the counter state
counter.count++;
counter.$patch({ count: counter.count + 1 });
counter.increment();

// Propriedades reativas
const visibilidadeHome = ref(true);
const visibilidadeFiltroVagas = ref(false);

</script>