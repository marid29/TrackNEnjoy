import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el archivo de rutas

const app = createApp(App);

app.use(router); // Añade Vue Router a la instancia de Vue

app.mount('#app');