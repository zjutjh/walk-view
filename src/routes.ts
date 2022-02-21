export const routes = [
  { path: '/', component: () => import('/src/pages/Login.vue') }, // 根目录为登录页面
  { path: '/register', component: () => import('/src/pages/Register.vue') }, // 报名页面
  { path: '/update/student', component: () => import('/src/pages/UpdateStudentInfo.vue') },
  { path: '/update/teacher', component: () => import('/src/pages/UpdateTeacherInfo.vue') },
  { path: '/loading', component: () => import('/src/pages/Loading.vue') },
  {
    path: '/info',
    component: () => import('/src/pages/Info.vue'),
    children: [
      { path: 'user/showstudent', component: () => import('/src/components/user/ShowStudentInfo.vue') },
      { path: 'user/showteacher', component: () => import('/src/components/user/ShowTeacherInfo.vue') },
      { path: 'team/notjoin', component: () => import('/src/components/team/NotJoin.vue') },
      { path: 'team/join', component: () => import('/src/components/team/JoinTeam.vue') },
      { path: 'team/create', component: () => import('/src/components/team/CreateTeam.vue') },
      { path: 'team/teaminfo', component: () => import('/src/components/team/TeamInfo.vue') },
      { path: 'team/updateteam', component: () => import('/src/components/team/UpdateTeam.vue') },
      { path: 'team/managemember', component: () => import('/src/components/team/ManageMember.vue') },
    ],
  },
]
