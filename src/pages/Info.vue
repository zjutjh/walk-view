<script setup lang="ts">
import { NCard, NTabs, NTabPane } from 'naive-ui';
import { RouterView, useRouter } from 'vue-router';
import NotJoin from '/src/components/team/NotJoin.vue'
import JoinTeam from '/src/components/team/JoinTeam.vue';
import CreateTeam from '/src/components/team/CreateTeam.vue';
import TeamInfo from '/src/components/team/TeamInfo.vue';
import UpdateTeam from '/src/components/team/UpdateTeam.vue';


// 添加团队信息相关的组件的路由
const router = useRouter()
// TODO: 添加个人信息相关路由

// 添加团队信息相关路由
router.addRoute({ path: "/team/notjoin", components: { teaminfo: NotJoin } })
router.addRoute({ path: "/team/join", components: { teaminfo: JoinTeam } })
router.addRoute({ path: "/team/create", components: { teaminfo: CreateTeam } })
router.addRoute({ path: "/team/teaminfo", components: { teaminfo: TeamInfo } })
router.addRoute({ path: "/team/updateteam", components: { teaminfo: UpdateTeam } })


// TODO: 设置默认路由为已经加入状态
router.replace("/team/notjoin")
</script>

<template>
    <n-card title="毅行信息管理 🚀" style="margin: 4% auto; width: 93%;">
        <n-tabs type="line">
            <n-tab-pane name="personal" tab="个人信息">
                <router-view name="userinfo"></router-view>
            </n-tab-pane>
            <n-tab-pane name="team" tab="团队信息">
                <router-view name="teaminfo"></router-view>
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<style>
</style>