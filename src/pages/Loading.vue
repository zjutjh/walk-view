<script setup lang="ts">
import { NSpace, NSpin, useDialog } from 'naive-ui'
import Server from '../config/Server'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { storeUserInfo, storeTeamInfo, storeUserMesage } from '../utility'

// 变量定义
const dialog = useDialog()
const router = useRouter()

onMounted(() => {
  const jwt = localStorage.getItem('jwt')
  if (jwt === '' || jwt === null) {
    // 到了这个页面本地还没有 jwt token 的话
    dialog.error({
      title: '登录错误',
      closable: false,
      content: '请重新从微信公众号进入',
      positiveText: '确定',
    })
    return
  }

  // 开始获取个人信息
  ;(async () => {
    try {
      // 获取个人信息
      const userInfoUrl = Server.urlPrefix + Server.apiMap['user']['info'] // 个人信息后端接口
      let userApiRespData: any = (
        await axios.get(userInfoUrl, {
          timeout: 3000,
          headers: { Authorization: 'Bearer ' + jwt },
        })
      ).data

      if (userApiRespData['code'] == 200) {
        // 存储用户信息
        storeUserInfo(userApiRespData)
        await storeTeamInfo(userApiRespData, jwt)
        await storeUserMesage(jwt)
        router.replace('/info')
      } else if (userApiRespData['msg'] == 'time error') {
        dialog.warning({
          closable: false,
          title: '尚未开始',
          content: '报名尚未开始',
          positiveText: '确定',
        })
      } else if (userApiRespData['msg'] == 'jwt error') {
        // jwt 有问题就重新登录
        const oauthUrl = Server.urlPrefix + Server.apiMap['basic']['oauth']
        localStorage.removeItem('jwt')
        window.location.replace(oauthUrl)
      } else {
        // 获取用户信息错误
        dialog.warning({
          title: '没有用户信息',
          content: '前往报名页面',
          positiveText: '确定',
          onPositiveClick: () => {
            router.push('/register')
          },
        })
      }
    } catch (error) {
      // 网络发生错误
      dialog.warning({
        title: '登录错误',
        content: '服务器错误, 请稍后重试',
        positiveText: '确定',
      })
    }
  })()
})
</script>

<template>
  <div style="margin-top: 50%">
    <n-space justify="center">
      <n-spin size="large" />
    </n-space>
  </div>

  <div style="text-align: center; margin-top: 30px">加载信息中 &nbsp;···</div>
</template>

<style></style>
