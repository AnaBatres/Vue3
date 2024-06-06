import { createApp } from 'vue'
import App from './App.vue'
import Tabla from "@/components/Tabla.vue";

Vue.component("tabla-component", Tabla);

createApp(App).mount('#app')
