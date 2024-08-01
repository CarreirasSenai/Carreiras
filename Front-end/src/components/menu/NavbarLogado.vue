<!-- <template>
  <div class="user-account-avatar">
    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="brown" size="large">
            <span class="text-h5">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="brown">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ user.fullName }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-2"></v-divider>
            <v-btn variant="text" rounded @click='redirectToHome'>
              Home
            </v-btn>
            <v-divider class="my-2"></v-divider>
            <v-btn variant="text" rounded @click='redirectToSchedule'>
              Agenda
            </v-btn>
            <v-divider class="my-2"></v-divider>
            <v-btn variant="text" @click="$emit('AbreChatHome')">Chat</v-btn>
            <v-divider class="my-2"></v-divider>
            <v-btn variant="text" rounded @click='redirectToProfile'>
              <a href="/perfil-candidato">Perfil</a>
            </v-btn>
            <v-divider class="mt-2 mb-4"></v-divider>
            <v-btn variant="text" rounded prepend-icon="mdi-logout" @click="logout">Sair</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    this.userLogado();
  },
  data: () => ({
    user: {
      initials: 'JD',
      fullName: 'Junior Dev',
      email: 'juniordev@gmail.com',
    },
  }),
  methods: {
    redirectToHome() {
      this.$router.push('/');
    },
    redirectToSchedule() {
      this.$router.push('/agenda-candidato');
    },
    redirectToChat() {
      this.$router.push('/chat');
    },
    redirectToProfile() {
      this.$router.push('/perfil-candidato');
    },

    // Autenticar usúario e coletar dados
    async userLogado() {
      try {
        const response = await axios.get('http://localhost:4000/user/read', {
          withCredentials: true
        });

        this.user.initials = extrairIniciais(response.data.usuario.nome_completo);
        this.user.fullName = response.data.usuario.nome_completo;
        this.user.email = response.data.usuario.email;

        console.log('Usúario autenticado!', response.data);

      } catch (error) {
        console.error('Erro ao obter dados do usuário', error.response ? error.response.data : error.message);
        this.$router.push('/login');
      }
    },

    // Fazer o Logout
    async logout() {
      try {
        const response = await axios.get('http://localhost:4000/user/logout', {
          withCredentials: true  // Importante: enviar cookies com a requisição
        });
        console.log(response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro ao efetuar Logout', error.response);
      }
    },
  }
}

function extrairIniciais(nomeCompleto) {
  const palavras = nomeCompleto.split(" ");

  const primeiroNome = palavras[0];
  const segundoNome = palavras.length > 1 ? palavras[1] : "";

  const inicialPrimeiroNome = primeiroNome.charAt(0).toUpperCase();
  const inicialSegundoNome = segundoNome.charAt(0).toUpperCase();

  const iniciais = inicialPrimeiroNome + inicialSegundoNome;

  return iniciais;
}

</script> -->