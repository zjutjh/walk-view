<script setup lang="ts">
import { NCard, NTabs, NTabPane } from 'naive-ui';
import { RouterView, useRouter } from 'vue-router';
import NotJoin from '/src/components/team/NotJoin.vue'
import JoinTeam from '/src/components/team/JoinTeam.vue';
import CreateTeam from '/src/components/team/CreateTeam.vue';
import TeamInfo from '/src/components/team/TeamInfo.vue';
import UpdateTeam from '/src/components/team/UpdateTeam.vue';
import SubmitUserInfo from "/src/components/user/SubmitUserInfo.vue";
import ShowUserInfo from '../components/user/ShowUserInfo.vue';
import { ref } from 'vue';

// 添加团队信息相关的组件的路由
const router = useRouter()
// TODO: 添加个人信息相关路由
router.addRoute({ path: "/user/showinfo", component: ShowUserInfo })
// 添加团队信息相关路由
router.addRoute({ path: "/team/notjoin", component: NotJoin })
router.addRoute({ path: "/team/join", component: JoinTeam })
router.addRoute({ path: "/team/create", component: CreateTeam })
router.addRoute({ path: "/team/teaminfo", component: TeamInfo })
router.addRoute({ path: "/team/updateteam", component: UpdateTeam })
router.addRoute({ path: "/team/submit", component: SubmitUserInfo })

router.replace("/user/showinfo") // 默认展示个人信息
function changeTab(value: string) {
    if (value === "team") 
        router.replace("/team/teaminfo") // TODO: 设置默认路由为已经加入状态
    else if (value === "personal") {
        router.replace("/user/showinfo") 
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