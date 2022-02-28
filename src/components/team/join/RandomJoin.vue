<script setup lang="ts">
import axios from 'axios'
import { NSelect, NButton, NSpace, NGrid, NGridItem, useMessage, NModal } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ServerConfig from '../../../config/Server'
import RandomList from './RandomList.vue'

const router = useRouter()
const message = useMessage()
const route = ref(1)
const showModal = ref(false)
const routeOptions = ref([
  { label: '朝晖全程', value: 1 },
  { label: '屏峰半程', value: 2 },
  { label: '屏峰全程', value: 3 },
  { label: '莫干山半程', value: 4 },
  { label: '莫干山全程', value: 5 },
])

let randomTeamList = ref(null)
let isWaiting = ref(true)
let canRefresh = true

function onPositiveClick() {
  showModal.value = false
  router.push('/loading')
}

function goBack() {
  router.push('/info/team/notjoin')
}

async function getRandomList(routeNumber: number = route.value) {
  const randMatchUrl = ServerConfig.urlPrefix + ServerConfig.apiMap['team']['randomList']
  const getRandomListData = { route: routeNumber }
  try {
    const response = await axios.post(randMatchUrl, getRandomListData, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
      timeout: 3000,
    })

    const respData: any = response.data
    return respData['data']
  } catch (_) {
    message.error('网络错误，请重试')
  }
}

async function refreshList() {
  if (!canRefresh) {
    message.warning("让生产队的驴休息一下吧")
    return
  }

  isWaiting.value = true
  randomTeamList.value = await getRandomList()
  
  // 让动画晚结束一些
  setTimeout(() => {
    isWaiting.value = false
  }, 200)

  // 让这个用户在获取到一次信息以后 1 s 内无法获取第二次信息
  canRefresh = false
  setTimeout(() => {
    canRefresh = true
  }, 1000)
}

onMounted(() => {
  // 挂载组件的时候获取一次列表
  ;(async () => {
    isWaiting.value = true
    randomTeamList.value = await getRandomList()
    // 让动画晚结束一些
    setTimeout(() => {
      isWaiting.value = false
    }, 200)
  })()
})

function routeUpdated(value: number) {
  ;(async () => {
    isWaiting.value = true
    randomTeamList.value = await getRandomList(value)
    // 让动画晚结束一些
    setTimeout(() => {
      isWaiting.value = false
    }, 200)
  })()
}
</script>

<template>
  <n-space style="margin-top: 10px" :vertical="true">
    <n-grid :x-gap="8">
      <n-grid-item :span="18">
        <n-select v-on:update-value="routeUpdated" v-model:value="route" :options="routeOptions"></n-select>
      </n-grid-item>
      <n-grid-item>
        <n-button @click="refreshList" :type="'primary'">换一换</n-button>
      </n-grid-item>
    </n-grid>

    <random-list id="random-list" :is-waiting="isWaiting" :random-team-list="randomTeamList" />

    <n-button id="return-button" @click="goBack" >返回上一步</n-button>
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

<style>
#random-list {
  margin-top: 10px;
}

#return-button {
  margin-top: 20px;
  width: 100%;
}
</style>
