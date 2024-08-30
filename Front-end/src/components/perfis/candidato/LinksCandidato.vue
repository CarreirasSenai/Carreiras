<template>
    <v-card>
        <v-card-title class="cor-primaria">Links</v-card-title>
        <v-card-text class="d-flex">
            <v-container>
                <v-row>
                    <v-col cols="6" md="6">
                        <p class="mdi mdi-instagram"><a target="_blank" href="https://www.instagram.com/"
                                class="mdi ml-2">instagram.com/teste</a></p>
                        <p class="mdi mdi-facebook"><a target="_blank" href="https://www.facebook.com/"
                                class="mdi ml-2">facebook.com/teste</a></p>
                        <p class="mdi mdi-linkedin"><a target="_blank" href="https://www.linkedin.com/in/"
                                    class="mdi ml-2">linkedin.com/teste</a></p>
                    </v-col>
                    <v-col cols="6" md="6">
                        <p class="mdi mdi-github"><a target="_blank" href="https://github.com/"
                                class="mdi ml-2">github.com/teste</a></p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<style scoped>
p {
    display: flex;
    margin: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-direction: row;
    align-items: center;
    align-content: center;
}

.mdi {
    font-size: 15px;
}

a {
    text-decoration: none;
    color: #6732d2;
}
</style>