// stores/counter.js
import { defineStore } from 'pinia';

// export const useCounterStore = defineStore('counter', {
//   state: () => {
//     return { 
//       count: 0,
//       nome: '',
//     }
//   },
//   actions: {
//     increment() {
//       this.count++
//       this.nome = 'thiago';
//     },
//   },
// });

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Thiago' }),
  getters: {
    doubleCount: (state) => state.count * 2,
    mudaNome: (state) => state.name = 'Teste',
  },
  actions: {
    increment() {
      this.count++
    },
  },
})