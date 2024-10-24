<template>
  <v-card>
    <v-card-title class="cor-primaria">Links</v-card-title>
    <v-card-text class="d-flex">
      <v-container>
        <v-row v-if="instagram || linkedin || github || site" no-gutters>
          <v-col cols="12" md="6">
            <p v-if="instagram" class="mdi mdi-instagram text-truncate">
              <a
                target="_blank"
                :href="instagram"
                class="mdi ml-2 link-size"
                >{{instagram !== '' ? instagram : ''}}</a
              >
            </p>
            <p v-if="linkedin" class="mdi mdi-linkedin text-truncate">
              <a
                target="_blank"
                :href="linkedin"
                class="mdi ml-2 link-size"
                >{{linkedin !== '' ? linkedin : ''}}</a
              >
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <p v-if="github" class="mdi mdi-github text-truncate">
              <a target="_blank" :href="github" class="mdi ml-2 link-size"
                >{{github !== '' ? github : ''}}</a
              >
            </p>
            <p v-if="site" class="mdi mdi-web text-truncate">
              <a target="_blank" :href="site" class="mdi ml-2 link-size"
                >{{site !== '' ? site : ''}}</a
              >
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { useCandidatoStore } from "@/stores/candidato";

export default {
  data: () => ({
    instagram: "",
    facebook: "",
    linkedin: "",
    github: "",
    site: "",
  }),
  computed: {
    usuario() {
      return useCandidatoStore();
    },
  },
  mounted() {
    (this.instagram = useCandidatoStore().dadosUser.link_instagram),
      (this.facebook = useCandidatoStore().dadosUser.link_facebook),
      (this.linkedin = useCandidatoStore().dadosUser.link_linkedin),
      (this.github = useCandidatoStore().dadosUser.link_github),
      (this.site = useCandidatoStore().dadosUser.link_site_pessoal);
  },
};
</script>
<style scoped>
p {
  margin: 6.8px;
}

.mdi {
  font-size: 21px;
}

a {
  text-decoration: none;
  color: #6732d2;
}

.link-size {
    font-size: 14px;
}
</style>