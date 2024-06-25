// Plugins
import { registerPlugins } from '@/plugins'

// Components
import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'

// Create Vue application
const app = createApp(App)

// Register plugins
registerPlugins(app)

// Configure the router and VCalendar
app.use(router)

// Mount the app
app.mount('#app')

new Vue({
    vuetify,
    render: h => h(App)
  }).$mount('#app')
