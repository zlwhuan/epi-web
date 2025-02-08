import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);  // 使用 ElementPlus 插件
app.mount('#app');     // 挂载 Vue 应用到 #app 元素
