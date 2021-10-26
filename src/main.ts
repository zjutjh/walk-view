import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Grant from "/src/pages/Grant.vue"
import Loading from "/src/pages/Loading.vue"
import Register from "/src/pages/Register.vue"

// 设置前端路由
const routes = [
    { path: '/', component: Grant },  // 根目录为授权页面
    { path: '/loading', component: Loading }, // 加载页面
    { path: '/register', component: Register }, // 报名页面
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
