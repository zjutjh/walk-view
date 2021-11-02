<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { NCard, NInput, NButton, NSpace, useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SeverConfig from '../../config/server'

const router = useRouter()
const teamID = ref("")
const teamPass = ref("")
const message = useMessage()

function joinTeam() {
    const joinTeamUrl = SeverConfig.urlPrefix + SeverConfig.apiMap["team"]["join"]
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
</script>

<template>
    <n-card title="🏊 &nbsp;&nbsp;通过团队密码加入团队" :embedded="true" :bordered="false">
        <n-space :size="30" :vertical="true">
            <n-input v-model:value="teamID" type="text" placeholder="输入你的团队编号" />
            <n-input v-model:value="teamPass" type="text" placeholder="输入你的团队密码" />
            <n-button @click="joinTeam" style="width: 100%;" type="primary">加入团队</n-button>
            <n-button @click="goBack" style="width: 100%;">返回上一步</n-button>
        </n-space>
    </n-card>
</template>

<style>
</style>