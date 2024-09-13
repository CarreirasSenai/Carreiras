<template>
    <div class="div-infos">
        <v-expansion-panels v-model="panel">
            <Descricao />
            <Formacoes />
            <Cursos />
            <Experiencias />
            <Habilidades />
        </v-expansion-panels>
    </div>
</template>

<script>
import Formacoes from './formacoes/Formacoes.vue';
import Cursos from './cursos/Cursos.vue';
import Experiencias from './experiencias/Experiencias.vue';
import Habilidades from './habilidades/Habilidades.vue';

export default {
    data() {
        return {
            panel: [0], // não exclua!
        };
    },
};
</script>

<style>
.div-infos {
    margin: 0 20px 20px 20px;
    padding-bottom: 3px;

    h3 {
        font-size: 20px;
    }

    .bloco-interno {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px 10px 30px 10px;
        border-bottom: 1px solid #E8E8E8;
    }

    .bloco-interno p {
        min-width: 150px;
        text-align: start;
        color: #666;
    }

    .bloco-interno h3 {
        min-width: 250px;
        color: #212121;
    }
}

.v-expansion-panels {
    .v-expansion-panel-title {
        color: #6732d2;
    }

    .mdi {
        color: #6732d2;
    }

    .bloco {
        padding: 10px;
    }

    .v-card-title {
        font-size: unset;
    }

    @media(max-width:600px) {
        .bloco {
            padding: 10px 0;
        }
    }
}

.div-button-edit {
    display: flex;
    justify-content: end;

    .bt-add {
        background-color: #6732d2;
        border-color: #6732d2;
        color: white;
        margin-top: 20px;
    }
}
</style>