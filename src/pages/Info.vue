<script setup lang="ts">
import { NCard, NTabs, NTabPane, NButton, useMessage } from 'naive-ui';
import { RouterView, useRouter } from 'vue-router';

const router = useRouter()
const message = useMessage()

// 根据是校友还是学生来选择不同的页面展示
let userInfoRoute = ""
if (localStorage.getItem("campus") === "5") {
    userInfoRoute = "/info/user/showteacher" // 教职工信息展示
} else {
    userInfoRoute = "/info/user/showstudent" // 学生信息展示
}

router.replace(userInfoRoute) // 默认展示个人信息
function changeTab(value: string) {
    if (value === "team") {
        if (localStorage.getItem("team_id") == "-1") {
            router.replace("/info/team/notjoin")
        } else {
            router.replace("/info/team/teaminfo")
        }
    } else if (value === "personal") {
        router.replace(userInfoRoute)
    }
}

function refresh() {
    if (localStorage.getItem("canLoadInfo") == null || localStorage.getItem("canLoadInfo") == "yes") {
        localStorage.setItem("canLoadInfo", "no")
        router.replace("/loading")
        setTimeout(() => {
            localStorage.setItem("canLoadInfo", "yes")
        }, 2000)
    } else {
        message.warning("让生产队的驴休息一下吧")
    }
}
</script>

<template>
    <n-card title="毅行信息管理 &nbsp; 🚀" style="margin: 4% auto; width: 93%;">
        <template #header-extra>
            <n-button @click="refresh" round>
                <div style="margin-left: 8px">刷新 🔥</div>
            </n-button>
        </template>
        <n-tabs @update:value="changeTab" type="line">
            <n-tab-pane name="personal" tab="个人信息">
                <router-view></router-view>
            </n-tab-pane>
            <n-tab-pane name="team" tab="团队信息">
                <router-view></router-view>
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<style>
</style>