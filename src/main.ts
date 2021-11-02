import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Login from "/src/pages/Login.vue"
import Loading from "/src/pages/Loading.vue"
import Register from "/src/pages/Register.vue"
import Info from "/src/pages/Info.vue"

// 设置前端路由
const routes = [
    { path: '/', component: Login },  // 根目录为加载页面
    { path: '/register', component: Register }, // 报名页面
    { path: '/info', component: Info },
    { path: '/loading', component: Loading }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
