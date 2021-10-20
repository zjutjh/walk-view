import { createApp } from 'vue'
import App from './Test.vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = []
const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(router)
app.mount('#app')
