<script lang="ts" setup>
import axios from 'axios'
import { NThing, NTag, NCard, NButton, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import Server from '../../../config/Server'

const router = useRouter()
const message = useMessage()
const props = defineProps<{
  teamId: number
  name: string
  slogan: string
  num: number
}>()

function randomJoin() {
  const randommJoinUrl = Server['urlPrefix'] + Server['apiMap']['team']['randomJoin']
  const reqData = {
    id: props.teamId,
  }

  ;(async () => {
    const response = axios.post(randommJoinUrl, reqData, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
      timeout: 3000,
    })

    const respData: any = (await response).data
    if (respData['code'] == 200) {
      message.success('加入成功')
      router.push('/loading')
    } else {
      message.error(respData['msg'])
    }
  })()
}
</script>

<template>
  <n-card id="team-item" embedded>
    <n-thing>
      <template #header>{{ name }}</template>

      <template #header-extra>
        <n-tag type="success" :size="'small'"> {{ num }}人 </n-tag>
      </template>

      <template #description>
        {{ slogan }}
      </template>

      <template #action>
        <n-button :type="'primary'" id="join-button" @click="randomJoin" ghost>申请加入</n-button>
      </template>
    </n-thing>
  </n-card>
</template>

<style>
#team-item {
  margin-top: 20px;
}

#join-button {
  width: 100%;
}
</style>
