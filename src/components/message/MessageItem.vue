<script lang="ts" setup>
import axios from 'axios'
import { NCard, NButton, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import Server from '../../config/Server'

const messagePrompt = useMessage()
const router = useRouter()
const props = defineProps<{
  id: number
  message: string
}>()

function deleteMessage() {
  ;(async () => {
    const deleteMessageUrl = Server.urlPrefix + Server.apiMap['message']['delete']
    const jwt = localStorage.getItem('jwt')
    const deleteMessageData = {
      message_id: props.id,
    }
    const response = await axios.post(deleteMessageUrl, deleteMessageData, {
      timeout: 3000,
      headers: { Authorization: 'Bearer ' + jwt },
    })

    const respData: any = response.data
    if (respData['code'] == 200) {
      router.push('/loading')
    } else {
      messagePrompt.error('网络错误')
    }
  })()
}
</script>

<template>
  <n-card id="message-item" title="系统通知" embedded>
    <template #header-extra>
      <n-button :type="'primary'" :size="'small'" @click="deleteMessage">朕已阅</n-button>
    </template>

    {{ message }}
  </n-card>
</template>

<style>
#message-item {
  margin-bottom: 10px;
}
</style>
