<script setup lang="ts">
import { NCard, NTable, NButton } from 'naive-ui';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

// 展示用的数据
const teamData = ref(JSON.parse(<string>localStorage.getItem("team_data")))

// 是否能修改
const canModify = computed(() => localStorage.getItem("status") == "2" ? true : false)

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
</script>

<template>
    <n-card title="👟 &nbsp; 基本信息" embedded :bordered="false" size="small">
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
        <n-table :bordered="true" :single-line="false">
            <thead>
                <tr>
                    <th style="text-align: center; width: 40%;">姓名</th>
                    <th style="text-align: center;">身份</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="left-item">Node Sans</td>
                    <td class="right-teammate-item">队长</td>
                </tr>

                <tr>
                    <td class="left-item">NULL</td>
                    <td class="right-teammate-item">队员</td>
                </tr>

                <tr>
                    <td class="left-item">I-Info</td>
                    <td class="right-teammate-item">队员</td>
                </tr>
            </tbody>
        </n-table>
    </n-card>

    <n-button v-if="canModify" @click="jumpToUpdateTeam" style="margin-top: 8%; width: 100%;" type="primary">修改信息</n-button>
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