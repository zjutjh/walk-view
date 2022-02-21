<script setup lang="ts">
import { NSpace, NSpin } from 'naive-ui'
import { useRouter } from 'vue-router'
import Server from '../config/Server'
import { onMounted } from '@vue/runtime-core'

// 变量定义
const router = useRouter()

// 函数定义
function getQueryVariable(variable: string): string {
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

// 挂载函数
onMounted(() => {
  // 挂载的事情清理的一些数据
  localStorage.removeItem('canLoadInfo')

  // 尝试获取 url 中的 jwtToken
  const jwtToken = getQueryVariable('jwt').replaceAll('!', '.')

  if (localStorage.getItem('jwt') == null) {
    if (jwtToken == '') {
      // 如果本地没有 token 并且还没有 token 参数的话
      const oauthUrl = Server.urlPrefix + Server.apiMap['basic']['oauth']
      window.location.href = oauthUrl
    } else {
      // 如果有后端重定向时回传的 token 的话
      localStorage.setItem('jwt', jwtToken)
    }
  }
  router.replace('/loading')
})
</script>

<template>
  <div style="margin-top: 50%">
    <n-space justify="center">
      <n-spin size="large" />
    </n-space>
  </div>

  <div style="text-align: center; margin-top: 30px">登录中 &nbsp;···</div>
</template>

<style></style>
