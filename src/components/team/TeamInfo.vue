<script setup lang="ts">
import { NCard, NSpace, NTable, NButton } from 'naive-ui';
import { useRouter } from 'vue-router'

const router = useRouter()

function jumpToUpdateTeam() {
    router.replace("/team/updateteam")
}
</script>

<template>
    <n-card title="👟 基本信息" embedded :bordered="false" size="small">
        <n-table :bordered="true" :single-line="false">
            <tbody>
                <tr>
                    <td class="left-item">
                        <strong>团队名称</strong>
                    </td>
                    <td class="right-item">重音猛男</td>
                </tr>

                <tr>
                    <td class="left-item">
                        <strong>团队校区</strong>
                    </td>
                    <td class="right-item">莫干山校区</td>
                </tr>

                <td class="left-item">
                    <strong>毅行路线</strong>
                </td>
                <td class="right-item">莫干山半程</td>
            </tbody>
        </n-table>
    </n-card>

    <n-card title="🧑‍🎓 队员信息" embedded :bordered="false" size="small">
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

    <n-button @click="jumpToUpdateTeam" style="margin-top: 8%; width: 100%;" type="primary">修改信息</n-button>
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