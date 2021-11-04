<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { NSelect, NCollapse, NCollapseItem, NInput, NButton, NSpace, useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ServerConfig from '../../config/server'

const router = useRouter()
const teamID = ref("")
const teamPass = ref("")
const message = useMessage()
const route = ref(null)
const routeOptions = [
    {
        label: '朝晖校区',
        value: '1'
    },
    {
        label: '屏峰半程',
        value: '2'
    },
    {
        label: "屏峰全程",
        value: '3',
    },
    {
        label: '莫干山半程',
        value: '4'
    },
    {
        label: '莫干山全程',
        value: '5'
    }
]

function joinTeam() {
    const joinTeamUrl = ServerConfig.urlPrefix + ServerConfig.apiMap["team"]["join"]
    axios.post(joinTeamUrl, {
        "team_id": Number(teamID.value),
        "password": teamPass.value
    }, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(function (response: AxiosResponse) {
        const respData: any = response.data
        if (respData["code"] == 200) {
            message.success("加入成功")
            setTimeout(() => router.replace("/loading"), 1000)
        } else {
            message.error(respData["msg"])
        }
    }).catch(function (error) {
        message.error("网络错误, 请检查网络")
    })
}

function goBack() {
    router.push("/info/team/notjoin")
}

function randMatch() {
    const randMatchUrl = ServerConfig.urlPrefix + ServerConfig.apiMap["team"]["match"]
    axios.get(randMatchUrl, {
        params: {
            "route": route.value
        },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(function (response: AxiosResponse) {
        const respData: any = response.data
        if (respData["code"] == 200) {
            message.success("随机加入成功")
            router.replace("/loading")
        } else {
            message.warning(respData["msg"])
        }
    }).catch(function (error) {
        message.error("网络错误，请重试")
    })
}
</script>

<template>
    <n-collapse
        style="margin-top: 15px;"
        default-expanded-names="1"
        arrow-placement="right"
        accordion
    >
        <n-collapse-item title="🏊 &nbsp;&nbsp;通过团队密码加入团队" name="1">
            <n-space style="margin-top: 10px;" :size="30" :vertical="true">
                <n-input v-model:value="teamID" type="text" placeholder="输入你的团队编号" />
                <n-input v-model:value="teamPass" type="text" placeholder="输入你的团队密码" />
                <n-button @click="joinTeam" style="width: 100%;" type="primary">加入团队</n-button>
                <n-button @click="goBack" style="width: 100%;">返回上一步</n-button>
            </n-space>
        </n-collapse-item>
        <n-collapse-item title="🙈 &nbsp;&nbsp;随机组队" name="2">
            <n-space style="margin-top: 10px;" :size="30" :vertical="true">
                <n-select placeholder="请选择你的路线" v-model:value="route" :options="routeOptions"></n-select>
                <n-button @click="randMatch" style="width: 100%;" type="primary">随机匹配</n-button>
                <n-button @click="goBack" style="width: 100%;">返回上一步</n-button>
            </n-space>
        </n-collapse-item>
    </n-collapse>
</template>

<style>
</style>