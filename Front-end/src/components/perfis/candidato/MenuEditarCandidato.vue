<template>
    <div class="text-center w-100">
        <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
                <span class="mdi mdi-dots-horizontal w-100 text-subtitle" v-bind="props"></span>
            </template>

            <v-list>
                <v-list-item class="pa-0">
                    <v-list-item-title class="cursor-pointer">
                        <EditarCadCandidato />
                        <EditarFotoCapa />
                        <EditarLinksCandidato />
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<style>
* {
    /* border: 1px solid red; */
}

/* .div-button-edit {
    height: 50px;
    width: 50px;
    position: absolute;
    right: 0;
    top: 120px;
} */
</style>