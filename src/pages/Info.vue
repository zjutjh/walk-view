<script setup lang="ts">
import { NCard, NTabs, NTabPane } from 'naive-ui';
import { RouterView, useRouter } from 'vue-router';
import NotJoin from '/src/components/team/NotJoin.vue'
import JoinTeam from '/src/components/team/JoinTeam.vue';
import CreateTeam from '/src/components/team/CreateTeam.vue';


// 添加团队信息相关的组件的路由
const router = useRouter()
router.addRoute({ path: "/team/notjoin", component: NotJoin })
router.addRoute({ path: "/team/join", component: JoinTeam })
router.addRoute({ path: "/team/create", component: CreateTeam })

// TODO: 设置默认路由为未加入状态
router.replace("/team/notjoin")
</script>

<template>
    <n-card title="毅行信息管理" style="margin: 35px auto; width: 85%;">
        <n-tabs type="line">
            <n-tab-pane name="personal" tab="个人信息">之后这个地方会有个人信息的</n-tab-pane>
            <n-tab-pane name="team" tab="团队信息">
                <router-view></router-view>
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<style>
</style>