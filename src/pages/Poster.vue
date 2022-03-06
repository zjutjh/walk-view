<script lang="ts" setup>
import axios from 'axios'
import Server from '../config/Server'
import { NPageHeader, NCard, NAlert, NSpin, useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

let isLoading = ref(true)
let posterImgUrl = ref('')

const router = useRouter()

onMounted(() => {
  const getPosterUrl = Server.urlPrefix + Server.apiMap['poster']['get']
  const jwt = localStorage.getItem('jwt')
  const message = useMessage()
  ;(async () => {
    const response = await axios.get(getPosterUrl, {
      timeout: 3000,
      headers: { Authorization: 'Bearer ' + jwt },
    })

    const respData: any = response.data
    if (respData['code'] == 200) {
      posterImgUrl.value = respData['data']['img_url']
      isLoading.value = false
    } else {
      message.error('海报生成错误')
    }
  })()
})

function goBack() {
  router.push('/loading')
}
</script>

<template>
  <n-card style="margin: 4% auto; width: 93%">
    <n-page-header title="团队海报查看" @back="goBack">
      <n-alert title="如何保存海报" type="info"> 长按海报后点击保存图片即可保存海报至系统相册了哦 </n-alert>

      <!-- 海报加载动画 -->
      <div v-if="isLoading" id="loading-state">
        <n-spin size="large">
          <template #description>
            <div id="loading-prompt">加载海报中</div>
          </template>
        </n-spin>
      </div>

      <!-- 海报 -->
      <div id="poster-img-container">
        <img id="poster-img" v-if="!isLoading" :src="posterImgUrl" />
      </div>
    </n-page-header>
  </n-card>
</template>

<style>
#poster-img-container {
  text-align: center;
}

#poster-img {
  margin-top: 20px;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
}

#loading-state {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
}

#loading-prompt {
  margin-top: 20px;
}
</style>
