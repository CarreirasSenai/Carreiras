<template>
    <div class="d-flex justify-space-around">
        <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
                <span class="mdi mdi-dots-horizontal w-100 text-subtitle" v-bind="props"></span>
            </template>

            <v-list>
                <v-list-item class="pa-0">
                    <v-list-item-title class="cursor-pointer">
                        <EditarDescEmpresa />
                        <EditarFotoCapaEmpresa />
                        <EditarCadEmpresa />
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
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