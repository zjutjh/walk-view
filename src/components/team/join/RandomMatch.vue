<script setup lang="ts">
import axios, { AxiosResponse } from 'axios'
import { NSelect, NButton, NSpace, useMessage, NModal } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ServerConfig from '../../../config/Server'

const router = useRouter()
const message = useMessage()
const route = ref(null)
const routeOptions = [
  {
    label: '朝晖校区',
    value: '1',
  },
  {
    label: '屏峰半程',
    value: '2',
  },
  {
    label: '屏峰全程',
    value: '3',
  },
  {
    label: '莫干山半程',
    value: '4',
  },
  {
    label: '莫干山全程',
    value: '5',
  },
]
const showModal = ref(false)

function onPositiveClick() {
  showModal.value = false
  router.push('/loading')
}

function goBack() {
  router.push('/info/team/notjoin')
}

function randMatch() {
  const randMatchUrl = ServerConfig.urlPrefix + ServerConfig.apiMap['team']['match']
  axios
    .get(randMatchUrl, {
      params: {
        route: route.value,
      },
      timeout: 3000,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then(function (response: AxiosResponse) {
      const respData: any = response.data
      if (respData['code'] == 200) {
        showModal.value = true
      } else {
        message.warning(respData['msg'])
      }
    })
    .catch(function (_) {
      message.error('网络错误，请重试')
    })
}
</script>

<template>
  <n-space style="margin-top: 10px" :size="30" :vertical="true">
    <n-select placeholder="请选择你的路线" v-model:value="route" :options="routeOptions"></n-select>
    <n-button @click="randMatch" style="width: 100%" type="primary">随机匹配</n-button>
    <n-button @click="goBack" style="width: 100%">返回上一步</n-button>
  </n-space>

  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    :closable="false"
    preset="dialog"
    title="随机加入成功"
    content="为了防止被队长踢出队伍，请尽快联系队长。"
    positive-text="确认"
    @positive-click="onPositiveClick"
  />
</template>

<style></style>
