import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modal: {
      namespaced: true,
      state: {
        isVisible: false,
        eventTitles: '',
      },
      mutations: {
        showModal(state, titles) {
          state.isVisible = true;
          state.eventTitles = titles;
        },
        hideModal(state) {
          state.isVisible = false;
          state.eventTitles = '';
        },
      },
    },
  },
});