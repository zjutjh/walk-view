import Server from "./config/Server"
import axios from "axios"

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
