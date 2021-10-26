<script setup lang="ts">
import { NCard, NInput, NButton, NSpace } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter()

function goBack() {
    router.push("/team/notjoin")
}
</script>

<template>
    <n-card title="🏊 &nbsp;&nbsp;通过团队码加入团队" :embedded="true" :bordered="false">
        <n-input type="text" placeholder="输入你的团队码" />
        <n-space :vertical="true">
            <n-button style="margin-top: 25px;width: 100%;" type="primary">查找团队</n-button>
            <n-button @click="goBack" style="margin-top: 18px;width: 100%;" >返回上一步</n-button>
        </n-space>
    </n-card>
</template>

<style>
</style>