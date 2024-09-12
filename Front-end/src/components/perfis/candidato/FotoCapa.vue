<template>
    <div class="div-capa-foto">
        <img class="capa" :src="user.user.capa">
        <div class="pos-capa"></div>
        <div class="div-foto-perfil text-center">
            <img :src="user.user.foto" class="foto-perfil" alt="Foto de Perfil">
            <h3 class="cor-primaria">{{ user.dadosUser.nome_completo }}</h3>
            <h4 class="text-grey-darken-2"> {{ user.dadosUser.profissao }} </h4>
            <MenuEditarCandidato style="height: 20px !important;" class="d-flex align-center" />
        </div>
    </div>
</template>

<script>
import { useCandidatoStore } from '@/stores/candidato';

export default {
    data: () => ({
        dialog: false,
    }),
    mounted() {
        const user = useCandidatoStore();
        user.userLogado();
    },
    computed: {
        user() {
            return useCandidatoStore();
        }
    },
}
</script>

<style lang="scss" scoped>
.div-capa-foto {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .capa {
        height: 250px;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    .pos-capa {
        height: 150px;
        width: 100%;
        display: flex;
        justify-content: end;
    }

    .div-foto-perfil {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 200px;
        position: absolute;
        gap: 5px;
        top: 150px;

        .foto-perfil {
            width: 150px;
            height: 150px;
            border-radius: 100%;
            border: 2px solid #6832D2;
            background-color: #eee;
        }

        h3,
        h4 {
            margin: 0;
        }

        h4 {
            font-size: 13px;
            text-transform: uppercase;
        }
    }
}

@media(max-width:800px) {
    .div-capa-foto {
        margin: 0;
    }
}
</style>
