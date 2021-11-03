<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { NCard, NTable, NButton, NSpace, useMessage } from 'naive-ui';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import MemberCard from './MemberCard.vue';
import ServerConfig from '../../config/server'

const router = useRouter()
const message = useMessage()

// 展示用的数据
const teamData = ref(JSON.parse(<string>localStorage.getItem("team_data")))

// 是否能修改
const isLeader = computed(() => localStorage.getItem("status") == "2" ? true : false)

// 毅行路线数据
const teamRoute = computed(() => {
    if (teamData.value["route"] == 1)
        return "朝晖全程"
    else if (teamData.value["route"] == 2)
        return "屏峰半程"
    else if (teamData.value["route"] == 3)
        return "屏峰全程"
    else if (teamData.value["route"] == 4)
        return "莫干山半程"
    else if (teamData.value["route"] == 5)
        return "莫干山全程"
})

function jumpToUpdateTeam() {
    router.replace("/info/team/updateteam")
}

function jumpToManageMember() {
    router.replace("/info/team/managemember")
}

function disbandTeam() {
    const disbandTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap["team"]["disband"]
    axios.get(disbandTeamUrl, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(function (response: AxiosResponse) {
        const respData: any = response.data
        if (respData["code"] == 200) {
            message.success("解散成功")
            setTimeout(() => router.replace("/loading"), 1000)
        } else {
            message.error(respData["msg"])
        }
    }).catch(function (error) {
        message.error("网络错误，请检查网络")
    })
}
</script>

<template>
    <n-card title="👟 &nbsp; 基本信息" embedded :bordered="false" size="small">
        <template #header-extra>
            <n-button v-if="isLeader" @click="jumpToUpdateTeam" size="small" round>修改信息</n-button>
        </template>
        <n-table :bordered="true" :single-line="false">
            <tbody>
                <tr>
                    <td class="left-item">
                        <strong>团队名称</strong>
                    </td>
                    <td class="right-item">{{ teamData["name"] }}</td>
                </tr>

                <tr>
                    <td class="left-item">
                        <strong>团队编号</strong>
                    </td>
                    <td class="right-item">{{ teamData["id"] }}</td>
                </tr>

                <tr>
                    <td class="left-item">
                        <strong>团队密码</strong>
                    </td>
                    <td class="right-item">{{ teamData["password"] }}</td>
                </tr>

                <td class="left-item">
                    <strong>毅行路线</strong>
                </td>
                <td class="right-item">{{ teamRoute }}</td>
            </tbody>
        </n-table>
    </n-card>

    <n-card title="🧑‍🎓 &nbsp; 队员信息" embedded :bordered="false" size="small">
        <template #header-extra>
            <n-button v-if="isLeader" @click="jumpToManageMember" size="small" round>管理团队</n-button>
        </template>
        <!-- 领队信息 -->
        <member-card
            :name="teamData['leader']['name']"
            :tel="teamData['leader']['contact']['tel']"
            :qq="teamData['leader']['contact']['qq']"
            :wechat="teamData['leader']['contact']['wechat']"
            :is-leader="true"
        ></member-card>

        <!-- 队员信息 -->
        <member-card
            style="margin-top: 15px;"
            v-for="member in teamData['member']"
            :name="member['name']"
            :tel="member['contact']['tel']"
            :qq="member['contact']['qq']"
            :wechat="member['contact']['wechat']"
            :is-leader="false"
        ></member-card>
    </n-card>
    <n-button v-if="isLeader" style="width: 100%; margin-top: 20px;" type="primary">提交团队</n-button>
    <n-button
        @click="disbandTeam"
        v-if="isLeader"
        style="width: 100%; margin-top: 20px;"
        type="error"
    >解散团队</n-button>
</template>

<style>
.left-item {
    text-align: center;
    width: 40%;
}
.right-item {
    text-align: center;
}
.right-teammate-item {
    text-align: center;
}
</style>