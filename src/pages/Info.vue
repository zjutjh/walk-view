<script setup lang="ts">
import { NCard, NTabs, NTabPane, NButton, useMessage } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { isTeacher, defaultTab } from '../utility'

const router = useRouter()
const message = useMessage()

// 该页面默认显示的 tab
const defaultTabName = ref(defaultTab())
// 用户信息页面默认要展示的是老师页面还是学生页面
const userInfoRoute = isTeacher() ? '/info/user/showteacher' : '/info/user/showstudent'

// 设置默认 tab 下显示的页面
onMounted(() => {
  if (defaultTab() == 'team') {
    if (localStorage.getItem('team_id') == '-1') {
      router.push('/info/team/notjoin')
    } else {
      router.push('/info/team/teaminfo')
    }
  } else if (defaultTab() === 'user') {
    router.push(userInfoRoute)
  }
})

// 在修改以后设置 tab 应该显示的页面
function changeTab(value: string) {
  if (value === 'team') {
    if (localStorage.getItem('team_id') == '-1') {
      router.push('/info/team/notjoin')
    } else {
      router.push('/info/team/teaminfo')
    }
  } else if (value === 'user') {
    router.push(userInfoRoute)
  }
}

function refresh() {
  if (localStorage.getItem('canLoadInfo') == null || localStorage.getItem('canLoadInfo') == 'yes') {
    localStorage.setItem('canLoadInfo', 'no')
    router.push('/loading')
    setTimeout(() => {
      localStorage.setItem('canLoadInfo', 'yes')
    }, 1000)
  } else {
    message.warning('让生产队的驴休息一下吧')
  }
}
</script>

<template>
  <n-card title="毅行信息管理 &nbsp; 🚀" style="margin: 4% auto; width: 93%">
    <template #header-extra>
      <n-button @click="refresh" round>
        <div style="margin-left: 8px">刷新 🔥</div>
      </n-button>
    </template>
    <n-tabs @update:value="changeTab" :default-value="defaultTabName" type="line">
      <n-tab-pane name="user" tab="个人信息">
        <router-view></router-view>
      </n-tab-pane>
      <n-tab-pane name="team" tab="团队信息">
        <router-view></router-view>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style></style>
