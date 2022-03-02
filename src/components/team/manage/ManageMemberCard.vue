<script setup lang="ts">
import { NSpace, NButton, NCard, useMessage } from 'naive-ui'
import ServerConfig from '../../../config/Server'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Server from '../../../config/Server'

const message = useMessage()
const router = useRouter()
defineProps({
  name: String,
  isLeader: Boolean,
  tel: String,
  openId: String,
})

function removeMember(openID: string | undefined) {
  const removeMemberUrl = ServerConfig.urlPrefix + ServerConfig.apiMap['team']['remove']
  axios
    .get(removeMemberUrl, {
      params: {
        openid: openID,
      },
      timeout: 3000,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then(function (_) {
      message.success('删除队员成功')
      setTimeout(() => router.push('/loading'), 1000)
    })
    .catch(function (_) {
      message.error('网络错误，请检查网络')
    })
}
</script>

<template>
  <n-card
    :segmented="{
      content: 'soft',
    }"
    embedded
    :title="name"
    size="small"
  >
    <template #header-extra>
      <n-button @click="removeMember(openId)" :type="'error'" size="small">删除</n-button>
    </template>
    <n-space justify="space-between">
      <div>电话</div>
      <div style="text-align: right">{{ tel }}</div>
    </n-space>
  </n-card>
</template>
