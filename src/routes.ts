import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('/src/pages/Login.vue') }, // 根目录为登录页面
  { path: '/register', component: () => import('/src/pages/Register.vue') }, // 报名页面
  {
    path: '/loading',
    component: () => import('/src/pages/Loading.vue'),
    beforeEnter: (_, from) => {
      localStorage.setItem('parentPathOfLoading', from.fullPath)
    },
  },
  { path: '/poster', component: () => import('/src/pages/Poster.vue') },
  {
    path: '/info',
    component: () => import('/src/pages/Info.vue'),
    children: [
      { path: 'user/showinfo', component: () => import('/src/components/user/show/UserInfo.vue') },
      { path: 'message/showlist', component: () => import('/src/components/message/MessageList.vue') },
      { path: 'message/nomessage', component: () => import('/src/components/message/NoMessage.vue') },
      {
        path: 'update/student',
        component: () => import('/src/components/user/update/UpdateStudentInfo.vue'),
      },
      {
        path: 'update/teacher',
        component: () => import('/src/components/user/update/UpdateTeacherInfo.vue'),
      },
      { path: 'team/notjoin', component: () => import('/src/components/team/show/NotJoin.vue') },
      { path: 'team/join', component: () => import('/src/components/team/join/JoinTeam.vue') },
      { path: 'team/create', component: () => import('/src/components/team/CreateTeam.vue') },
      { path: 'team/teaminfo', component: () => import('/src/components/team/show/TeamInfo.vue') },
      { path: 'team/updateteam', component: () => import('/src/components/team/UpdateTeam.vue') },
      { path: 'team/managemember', component: () => import('/src/components/team/manage/ManageMember.vue') },
    ],
  },
]
