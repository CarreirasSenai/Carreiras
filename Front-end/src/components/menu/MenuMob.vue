<template>
    <nav class="menu-mob">
        <a href=""><span class="mdi mdi-briefcase-variant"></span>Vagas</a>
        <a href=""><span class="mdi mdi-calendar-month"></span>Agenda</a>
        <a href=""><span class="mdi mdi-chat-processing"></span>Chat</a>
        <div class="text-center">
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <button v-bind="props">
                        <span class="mdi mdi-dots-horizontal"></span>
                        Mais
                    </button>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title><a href="">Perfil</a></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title><a href="">Curriculo</a></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </nav>
</template>

<style>
nav {
    background-color: #5E17EB;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 0 10px 0;
    /* padding: 10px */
}

nav a {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
}

.v-list-item-title a {
    text-decoration: none;
    color: #333;
}

button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
}

.mdi {
    height: 40px;
}
</style>