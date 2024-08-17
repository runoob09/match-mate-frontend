import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/config/router/index"
import 'vant/lib/index.css';
let app = createApp(App);
app.use(router)
app.mount('#app')
