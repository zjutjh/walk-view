import Server from './config/Server'
import axios from 'axios'

export function getQueryVariable(variable: string): string {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return ''
}

// 加载时用来存储个人信息的函数
export function storeUserInfo(respData: any) {
  localStorage.setItem('user_data', JSON.stringify(respData['data']))
}

// 加载并存储团队信息的函数
export async function storeTeamInfo(userInfoApiRespData: any, jwt: string) {
  const getTeamInfoUrl = Server.urlPrefix + Server.apiMap['team']['info']
  const response = await axios.get(getTeamInfoUrl, {
    timeout: 3000,
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  })

  const respData: any = response.data
  localStorage.setItem('team_data', JSON.stringify(respData['data']))
}

// 加载并存储个人消息
export async function storeUserMesage(jwt: string) {
  const getMessagesUrl = Server.urlPrefix + Server.apiMap['message']['list']
  const response = await axios.get(getMessagesUrl, {
    timeout: 3000,
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  })

  const respData: any = response.data
  if (respData['code'] == 200)
    localStorage.setItem('message_data', JSON.stringify(respData['data']))
  else 
    localStorage.setItem('message_data', '')
}

// 校验一个 key 是否在 object 中的函数
export function isValidKey(key: string | number | symbol, object: object): key is keyof object {
  return key in object
}

// 判断是否是老师
export function isTeacher(): boolean {
  const userData = getUserData()
  return userData['campus'] === 5
}

// 查询 info 页面应该显示哪个 tab
export function defaultTab(): string {
  let parentPathOfLoading: string
  if (localStorage.getItem('parentPathOfLoading') === null) {
    parentPathOfLoading = '/'
  } else {
    parentPathOfLoading = localStorage.getItem('parentPathOfLoading') as string
  }

  const defaultTabTable = {
    '/info/user/showteacher': 'user',
    '/info/team/teaminfo': 'team',
    '/info/team/updateteam': 'team',
    '/info/team/managemember': 'team',
    '/info/update/teacher': 'user',
    '/info/update/student': 'user',
    '/info/team/notjoin': 'team',
    '/info/team/join': 'team',
    '/info/team/create': 'team',
    '/poster': 'team',
    '/info/message/showlist': 'message',
    '/info/message/nomessage': 'message',
  }

  // 根据 loading 页面的父页面来选择默认 tab
  if (isValidKey(parentPathOfLoading, defaultTabTable)) {
    return defaultTabTable[parentPathOfLoading]
  } else {
    return 'user'
  }
}

export function getUserData(): any {
  return JSON.parse(localStorage.getItem('user_data') as string)
}

export function getTeamData(): any {
  return JSON.parse(localStorage.getItem('team_data') as string)
}

export function parseGender(genderNumber: number): string {
  return genderNumber == 1 ? '男' : '女'
}

export function parseCampus(campusNumber: number): string {
  if (campusNumber == 1) {
    return '朝晖校区'
  } else if (campusNumber == 2) {
    return '屏峰校区'
  } else if (campusNumber == 3) {
    return '莫干山校区'
  } else {
    return ''
  }
}
