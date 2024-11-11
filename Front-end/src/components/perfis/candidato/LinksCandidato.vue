<template>
  <v-card>
    <v-card-title class="cor-primaria">Links</v-card-title>
    <v-card-text class="d-flex text-card">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <p class="mdi mdi-instagram text-truncate" :class="{ 'no-hover': instagram === 'Não informado' }">
              <a
                v-if="instagram"
                target="_blank"
                class="mdi ml-2 link-size"
                :href="instagram"
                >{{instagram}}</a
              >
            </p>
            <p class="mdi mdi-linkedin text-truncate" :class="{ 'no-hover': linkedin === 'Não informado' }">
              <a
                v-if="linkedin"
                target="_blank"
                class="mdi ml-2 link-size"
                :href="linkedin"
                >{{linkedin}}</a
              >
            </p>
          </v-col>
          <v-col cols="12" md="6" :class="{ 'no-hover': github === 'Não informado' }">
            <p class="mdi mdi-github text-truncate">
              <a v-if="github" target="_blank" 
              class="mdi ml-2 link-size"
              :href="github"
                >{{github}}</a
              >
            </p>
            <p class="mdi mdi-web text-truncate" :class="{ 'no-hover': site === 'Não informado' }">
              <a v-if="site" target="_blank" 
              class="mdi ml-2 link-size"
              :href="site"
                >{{site}}</a
              >
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <p class="mdi mdi-facebook text-truncate" :class="{ 'no-hover': facebook === 'Não informado' }">
              <a v-if="facebook" target="_blank" 
              class="mdi ml-2 link-size"
              :href="facebook"
                >{{facebook}}</a
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
    const linkInstagram = useCandidatoStore().dadosUser.link_instagram;
    const linkFacebook = useCandidatoStore().dadosUser.link_facebook;
    const linkGithub = useCandidatoStore().dadosUser.link_github;
    const linkLinkedin = useCandidatoStore().dadosUser.link_linkedin;
    const linkSite = useCandidatoStore().dadosUser.link_site_pessoal;
    (this.instagram = linkInstagram != null && linkInstagram != undefined && linkInstagram !== '' ? linkInstagram : 'Não informado'),
    (this.facebook =  linkFacebook != null && linkFacebook != undefined && linkFacebook !== '' ? linkFacebook : 'Não informado'),
    (this.linkedin =  linkLinkedin != null && linkLinkedin != undefined && linkLinkedin !== '' ? linkLinkedin : 'Não informado'),
    (this.github =  linkGithub != null && linkGithub != undefined && linkGithub !== '' ? linkGithub : 'Não informado'),
    (this.site =  linkSite != null && linkSite != undefined && linkSite !== '' ? linkSite : 'Não informado');
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

.text-card {
    height: 150px;
    min-height: 140px;
}

.no-hover {
  pointer-events: none !important;
  text-decoration: none;
  cursor: none !important;
}

.no-hover:hover {
  cursor: none !important;
}

.link-size {
    font-size: 14px;
}

@media (max-width: 959px) {
  .text-card {
      height: 200px;
  }
}
</style>