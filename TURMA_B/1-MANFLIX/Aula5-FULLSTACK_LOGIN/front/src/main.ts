import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import { createAuth } from 'vue-auth3';

import driverAuthBasic from "vue-auth3/drivers/auth/basic"
import driverHttpAxios from "vue-auth3/drivers/http/axios"
import driverAuthBearer from "vue-auth3/drivers/auth/bearer"

const app = createApp(App)
const auth = createAuth({
  plugins: {
    router,
  },
  drivers: {
    auth: driverAuthBasic,
    http: driverHttpAxios,
  },
  tokenDefaultKey: 'auth_token', 
  stores: ['storage', 'cookie'],
})


app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(auth)
import "@/assets/global.scss";

app.mount('#app')
