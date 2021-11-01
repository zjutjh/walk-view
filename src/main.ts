import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Loading from "/src/pages/Loading.vue"
import Register from "/src/pages/Register.vue"
import Info from "/src/pages/Info.vue"

// 设置前端路由
const routes = [
    { path: '/', component: Loading },  // 根目录为授权页面
    { path: '/register', component: Register }, // 报名页面
    { path: '/info', component: Info }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
