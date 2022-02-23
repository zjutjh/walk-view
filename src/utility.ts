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
  localStorage.setItem('name', respData['data']['name'])
  localStorage.setItem('college', respData['data']['college'])
  localStorage.setItem('stu_id', respData['data']['stu_id'])
  localStorage.setItem('gender', respData['data']['gender'])
  localStorage.setItem('campus', respData['data']['campus'])
  localStorage.setItem('status', respData['data']['status'])
  localStorage.setItem('create_op', respData['data']['create_op'])
  localStorage.setItem('join_op', respData['data']['join_op'])
  localStorage.setItem('team_id', respData['data']['team_id'])
  localStorage.setItem('qq', respData['data']['contact']['qq'])
  localStorage.setItem('wechat', respData['data']['contact']['wechat'])
  localStorage.setItem('tel', respData['data']['contact']['tel'])
}

// 加载并存储团队信息的函数
export async function storeTeamInfo(respData: any, jwt: string) {
  const getTeamInfoUrl = Server.urlPrefix + Server.apiMap['team']['info']
  const response = await axios.get(getTeamInfoUrl, {
    timeout: 3000,
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  })

  respData = response.data
  localStorage.setItem('team_data', JSON.stringify(respData['data']))
}

// 校验一个 key 是否在 object 中的函数
export function isValidKey(key: string | number | symbol, object: object): key is keyof object {
  return key in object
}

// 判断是否是老师
export function isTeacher(): boolean {
  return localStorage.getItem('campus') === '5'
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
    '/': 'user',
  }

  // 根据 loading 页面的父页面来选择默认 tab
  if (isValidKey(parentPathOfLoading, defaultTabTable)) {
    return defaultTabTable[parentPathOfLoading]
  } else {
    return ''
  }
}
