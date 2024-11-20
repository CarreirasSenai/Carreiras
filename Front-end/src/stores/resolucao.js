import { defineStore } from "pinia";

export const useResolucaoDesktop = defineStore('desktop', {
    state: () => ({
        resolucaoDesktop: true,
    }),

    actions: {
        verificaResolucao() {
            if (window.innerWidth < 800) {
                console.log('Resolução Mobile');
                return this.resolucaoDesktop = false;
            } else {
                console.log('Resolução Desktop');
                this.resolucaoDesktop = true;
            }
        }
    }
})