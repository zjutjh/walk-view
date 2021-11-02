import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Login from "/src/pages/Login.vue"
import Loading from "/src/pages/Loading.vue"
import Register from "/src/pages/Register.vue"
import Info from "/src/pages/Info.vue"
import NotJoin from '/src/components/team/NotJoin.vue'
import JoinTeam from '/src/components/team/JoinTeam.vue';
import CreateTeam from '/src/components/team/CreateTeam.vue';
import TeamInfo from '/src/components/team/TeamInfo.vue';
import UpdateTeam from '/src/components/team/UpdateTeam.vue';
import SubmitStudentInfo from "/src/components/user/SubmitStudentInfo.vue";
import ShowStudentInfo from '/src/components/user/ShowStudentInfo.vue';
import ShowTeacherInfo from '/src/components/user/ShowTeacherInfo.vue'
import UpdateStudentInfo from '/src/pages/UpdateStudentInfo.vue'
import UpdateTeacherInfo from '/src/pages/UpdateTeacherInfo.vue'

// 设置前端路由
const routes = [
    { path: '/', component: Login },  // 根目录为加载页面
    { path: '/register', component: Register }, // 报名页面
    { path: '/update/student', component: UpdateStudentInfo },
    { path: '/update/teacher', component: UpdateTeacherInfo },
    { path: '/loading', component: Loading },
    {
        path: '/info', component: Info, children: [
            { path: "user/showstudent", component: ShowStudentInfo },
            { path: "user/showteacher", component: ShowTeacherInfo },
            { path: "team/notjoin", component: NotJoin },
            { path: "team/join", component: JoinTeam },
            { path: "team/create", component: CreateTeam },
            { path: "team/teaminfo", component: TeamInfo },
            { path: "team/updateteam", component: UpdateTeam },
            { path: "team/submit", component: SubmitStudentInfo }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
