export default {
  urlPrefix: '',
  apiMap: {
    basic: {
      oauth: '/oauth',
      login: '/login',
    },
    user: {
      info: '/user/info',
      update: '/user/modify',
    },
    register: {
      student: '/register/student',
      teacher: '/register/teacher',
    },
    team: {
      create: '/team/create',
      info: '/team/info',
      join: '/team/join',
      update: '/team/update',
      remove: '/team/remove',
      disband: '/team/disband',
      submit: '/team/submit',
      match: '/team/match',
      leave: '/team/leave',
      randomList: '/team/random-list',
    },
  },
};
