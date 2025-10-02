import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import { createAuth } from 'vue-auth3';

import driverAuthBasic from "vue-auth3/drivers/auth/basic"
import driverHttpAxios from "vue-auth3/drivers/http/axios"

const app = createApp(App)
const auth = createAuth({
  plugins: {
    router,
  },
  drivers: {
        auth: {
          ...driverAuthBasic,
          request(auth,options,token:string){
            options.headers = options.headers || {};
            options.headers.Authorization = `Token ${token}`;
            return options;
          },
          response(auth,{data}:any){
            return data?.auth_token;
          }
        },
        http: driverHttpAxios,    
  },    
  tokenDefaultKey: "auth_token",
  loginData: {
    url: "/backend-api/api/auth/token/login/",
    method: "POST",
    redirect: "/home",
    fetchUser: true,
  },
  logoutData: {
    url: "/backend-api/api/auth/token/logout/",
    method: "POST",
    redirect: "/login",
  },
  fetchData: {
     url: "/backend-api/api/auth/users/me/",
     method: "GET",
     enabled: true,
  }
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
