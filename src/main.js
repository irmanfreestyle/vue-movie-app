import { createApp } from 'vue'
import { createPinia } from "pinia";
import router from './router.js'
import Toaster from "@meforma/vue-toaster";
import App from './App.vue'
import './style.scss'

const pinia = createPinia();
export const app = createApp(App);

app.use(Toaster, { position: 'bottom' })
app.use(router)
app.use(pinia);
app.mount("#app");