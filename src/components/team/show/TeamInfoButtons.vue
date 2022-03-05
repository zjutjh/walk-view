<script lang="ts" setup>
import axios, { AxiosResponse } from 'axios'
import { NButton, useMessage, useDialog } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ServerConfig from '../../../config/Server'
import { getTeamData, getUserData } from '../../../utility'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()

// 是否禁用提交按钮
const disabled = ref(false)

// 展示用的数据
const teamData = ref(getTeamData())

// 是否是队长
const isLeader = computed(() => {
  const userData = getUserData()
  return userData['status'] == '2' ? true : false
})

function disbandTeamAPI() {
  const disbandTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap['team']['disband']
  axios
    .get(disbandTeamUrl, {
      timeout: 3000,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then(function (response: AxiosResponse) {
      const respData: any = response.data
      if (respData['code'] == 200) {
        message.success('解散成功')
        setTimeout(() => router.push('/loading'), 1000)
      } else {
        message.error(respData['msg'])
      }
    })
    .catch(function (error) {
      message.error('网络错误，请检查网络')
    })
}

function disbandTeam() {
  dialog.warning({
    title: '警告',
    content: '你确定解散团队？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      disbandTeamAPI()
    },
    onNegativeClick: () => {},
  })
}

function submitTeam() {
  // 5s 禁用按钮
  if (disabled.value) {
    message.warning('请不要频繁点击按钮，造成服务器拥挤')
    return
  }
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 3000)

  const submitTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap['team']['submit']
  axios
    .get(submitTeamUrl, {
      timeout: 3000,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then(function (response: AxiosResponse) {
      const respData: any = response.data
      if (respData['code'] == 200) {
        message.success('提交队伍成功')
        setTimeout(() => router.push('/loading'), 1000)
      } else {
        message.error(respData['msg'])
      }
    })
    .catch(function (error) {
      message.error('网络错误，请检查网络')
    })
}

function leaveTeam() {
  const leaveTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap['team']['leave']
  axios
    .get(leaveTeamUrl, {
      timeout: 3000,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then(function (response: AxiosResponse) {
      const respData: any = response.data
      if (respData['code'] == 200) {
        message.success('退出成功')
        setTimeout(() => router.push('/loading'), 1000)
      } else {
        message.error(respData['msg'])
      }
    })
    .catch(function (error) {
      message.error('服务器错误')
    })
}

function rollbackTeamAPI() {
  const rollbackTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap['team']['rollback']
  axios
    .get(rollbackTeamUrl, {
      timeout: 3000,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then(function (response: AxiosResponse) {
      const respData: any = response.data
      if (respData['code'] == 200) {
        message.success('撤回成功')
        setTimeout(() => router.push('/loading'), 1000)
      } else {
        message.error(respData['msg'])
      }
    })
    .catch(function (error) {
      message.error('服务器错误')
    })
}

function rollbackTeam() {
  dialog.warning({
    title: '警告',
    content: '你确定撤销提交？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      rollbackTeamAPI()
    },
    onNegativeClick: () => {},
  })
}

function showPoster() {
  router.push('/info/team/poster')
}
</script>

<template>
  <n-button @click="showPoster" class="team-info-buttons" v-if="teamData['submitted']" ghost :type="'primary'"
    >查看团队海报</n-button
  >

  <n-button
    class="team-info-buttons"
    @click="rollbackTeam"
    v-if="isLeader && teamData['submitted']"
    type="error"
    ghost
    >撤销团队</n-button
  >
  <n-button
    class="team-info-buttons"
    @click="submitTeam"
    v-if="isLeader && !teamData['submitted']"
    type="primary"
    >提交团队</n-button
  >
  <n-button
    class="team-info-buttons"
    @click="disbandTeam"
    v-if="isLeader && !teamData['submitted']"
    type="error"
    ghost
    >解散团队</n-button
  >
  <n-button
    class="team-info-buttons"
    @click="leaveTeam"
    v-if="!isLeader && !teamData['submitted']"
    type="error"
    ghost
    >退出团队</n-button
  >
</template>

<style>
.team-info-buttons {
  width: 100%;
  margin-top: 20px;
}
</style>
