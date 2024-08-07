// // Plugins
// import { registerPlugins } from '@/plugins'

// // Components
// import { createApp } from 'vue'
// import App from './App.vue';
// import router from './router';
// import '@mdi/font/css/materialdesignicons.css'
// import vuetify from './plugins/vuetify'

// // Create Vue application
// const app = createApp(App)

// // Register plugins
// registerPlugins(app)

// // Configure the router and VCalendar
// app.use(router)

// // Mount the app
// app.mount('#app')

// new Vue({
//     vuetify,
//     render: h => h(App)
//   }).$mount('#app')

// LEIA! ******* ACIMA CONFIGS ANTIGAS COMENTADAS, ABAIXO NOVAS CONFIGS QUE RESOLVERAM OS CONSTANTES ERROS OCUPANDO TODO O CONSOLE. AJUSTES FEITOS NOS ARQUIVOS (vuetify.js) e (main.js)

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'; // Importe o objeto vuetify configurado
import './styles/keyframes.css';

const app = createApp(App);

// Use o router antes de montar o aplicativo
app.use(router);

// Configure o Vuetify
app.use(vuetify);

// Monte o aplicativo
app.mount('#app');
