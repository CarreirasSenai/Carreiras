import { defineStore } from "pinia";

export const useResolucaoDesktop = defineStore('desktop', {
    state: () => ({
        resolucaoDesktop: true,
    }),

    actions: {
        verificaResolucao(){
            if (window.innerWidth < 800) {
                return this.resolucaoDesktop = false;
                console.log(this.resolucaoDesktop);
            }
        }
    }
})