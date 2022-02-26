<script setup lang="ts">
import axios, { AxiosResponse } from 'axios'
import { NSelect, NCollapse, NCollapseItem, NInput, NButton, NSpace, useMessage, NModal } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ServerConfig from '../../../config/Server'
import PasswordJoin from './PasswordJoin.vue'
import RandomMatch from './RandomMatch.vue'

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
    .catch(function (error) {
      message.error('网络错误，请重试')
    })
}
</script>

<template>
  <n-collapse style="margin-top: 15px" default-expanded-names="1" arrow-placement="right" accordion>
    <n-collapse-item title="🏊 &nbsp;&nbsp;通过团队密码加入团队" name="1">
      <password-join></password-join>
    </n-collapse-item>
    <n-collapse-item title="🙈 &nbsp;&nbsp;随机组队" name="2">
     <random-match></random-match>
    </n-collapse-item>
  </n-collapse>
</template>

<style></style>
