<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { NCard, NTable, NButton, NSpace, useMessage, useDialog } from 'naive-ui';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import MemberCard from './MemberCard.vue';
import ServerConfig from '../../config/server'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()

// 是否禁用提交按钮
const disabled = ref(false)

// 展示用的数据
const teamData = ref(JSON.parse(<string>localStorage.getItem("team_data")))

// 是否是队长
const isLeader = computed(() => localStorage.getItem("status") == "2" ? true : false)

// 是否能允许随机
const allowMatch = computed(() => {
    if (teamData.value["allow_match"] == true)
        return "允许 ✅"
    else
        return "不允许 ❎"
})

// 是否提交
const isSubmitted = computed(() => {
    if (teamData.value["submitted"]) {
        return "提交成功 ✅"
    } else {
        return "尚未提交 ❎"
    }
})

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

function disbandTeamAPI() {
    const disbandTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap["team"]["disband"]
    axios.get(disbandTeamUrl, {
        timeout: 3000,
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

function disbandTeam() {
    dialog.warning({
        title: '警告',
        content: '你确定解散团队？',
        positiveText: '确定',
        negativeText: '不确定',
        onPositiveClick: () => {
            disbandTeamAPI()
        },
        onNegativeClick: () => {
            
        }
    })
}

function submitTeam() {
    // 5s 禁用按钮
    if (disabled.value) {
        message.warning("请不要频繁点击按钮，造成服务器拥挤")
        return
    }
    disabled.value = true
    setTimeout(() => {
        disabled.value = false
    }, 3000)

    const submitTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap["team"]["submit"]
    axios.get(submitTeamUrl, {
        timeout: 3000,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(function (response: AxiosResponse) {
        const respData: any = response.data
        if (respData["code"] == 200) {
            message.success("提交队伍成功")
            setTimeout(() => router.replace("/loading"), 1000)
        } else {
            message.error(respData["msg"])
        }
    }).catch(function (error) {
        message.error("网络错误，请检查网络")
    })
}

function leaveTeam() {
    const leaveTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap["team"]["leave"]
    axios.get(leaveTeamUrl, {
        timeout: 3000,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(function (response: AxiosResponse) {
        const respData: any = response.data
        if (respData["code"] == 200) {
            message.success("退出成功")
            setTimeout(() => router.replace("/loading"), 1000)
        } else {
            message.error(respData["msg"])
        }
    }).catch(function (error) {
        message.error("服务器错误")
    })
}
</script>

<template>
    <n-card title="👟 &nbsp; 基本信息" embedded :bordered="false" size="small">
        <template #header-extra>
            <n-button
                v-if="isLeader && !teamData['submitted']"
                @click="jumpToUpdateTeam"
                size="small"
                round
            >修改信息</n-button>
        </template>
        <n-table :bordered="true" :single-line="false">
            <tbody>
                <tr>
                    <td class="left-item">
                        <strong>是否提交</strong>
                    </td>
                    <td class="right-item">{{ isSubmitted }}</td>
                </tr>

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

                <tr>
                    <td class="left-item">
                        <strong>毅行路线</strong>
                    </td>
                    <td class="right-item">{{ teamRoute }}</td>
                </tr>

                <tr>
                    <td class="left-item">
                        <strong>随机队员</strong>
                    </td>
                    <td class="right-item">{{ allowMatch }}</td>
                </tr>
            </tbody>
        </n-table>
    </n-card>

    <n-card title="🧑‍🎓 &nbsp; 队员信息" embedded :bordered="false" size="small">
        <template #header-extra>
            <n-button
                v-if="isLeader && !teamData['submitted']"
                @click="jumpToManageMember"
                size="small"
                round
            >管理团队</n-button>
        </template>
        <!-- 领队信息 -->
        <member-card
            :name="teamData['leader']['name']"
            :tel="teamData['leader']['contact']['tel']"
            :qq="teamData['leader']['contact']['qq']"
            :wechat="teamData['leader']['contact']['wechat']"
            :is-leader="true"
            :campus="teamData['leader']['campus']"
        ></member-card>

        <!-- 队员信息 -->
        <member-card
            style="margin-top: 15px;"
            v-for="member in teamData['member']"
            :name="member['name']"
            :campus="member['campus']"
            :tel="member['contact']['tel']"
            :qq="member['contact']['qq']"
            :wechat="member['contact']['wechat']"
            :is-leader="false"
        ></member-card>
    </n-card>
    <n-button
        @click="submitTeam"
        v-if="isLeader && !teamData['submitted']"
        style="width: 100%; margin-top: 20px;"
        type="primary"
    >提交团队</n-button>
    <n-button
        @click="disbandTeam"
        v-if="isLeader && !teamData['submitted']"
        style="width: 100%; margin-top: 20px;"
        type="error"
    >解散团队</n-button>
    <n-button
        @click="leaveTeam"
        v-if="!isLeader && !teamData['submitted']"
        style="margin-top: 15px; width: 100%;"
        type="error"
    >退出团队</n-button>
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