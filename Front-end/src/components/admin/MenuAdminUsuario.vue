<template>
    <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
            <v-btn variant="tonal" icon="mdi-dots-horizontal" v-bind="props"></v-btn>
        </template>

        <v-list class="mt-2">
            <v-list-item class="pa-0">
                <v-list-item-title class="cursor-pointer">
                    <EditarCadUsuarioAdmin />
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    data: () => ({
        // items: [
        //     { title: 'Editar Perfil' },
        //     { title: 'Editar Descrição' },
        //     { title: 'Editar Foto e Capa' },
        // ],
    }),
}
</script>

<style>
* {
    /* border: 1px solid red; */
}
</style>