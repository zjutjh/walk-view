<script setup lang="ts">
import { NCard, NTabs, NTabPane } from 'naive-ui';
import { userInfo } from 'os';
import { RouterView, useRouter } from 'vue-router';

const router = useRouter()

// 根据是校友还是学生来选择不同的页面展示
let userInfoRoute = ""
if (localStorage.getItem("campus") === "5") {
    userInfoRoute = "/info/user/showteacher" // 教职工信息展示
} else {
    userInfoRoute = "/info/user/showstudent" // 学生信息展示
}

router.replace(userInfoRoute) // 默认展示个人信息
function changeTab(value: string) {
    if (value === "team")
        router.replace("/info/team/") // TODO: 设置默认路由为已经加入状态
    else if (value === "personal") {
        router.replace(userInfoRoute)
    }
}
</script>

<template>
    <n-card title="毅行信息管理 🚀" style="margin: 4% auto; width: 93%;">
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